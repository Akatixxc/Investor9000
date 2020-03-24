/* eslint-disable no-await-in-loop */
const { CronJob } = require('cron');
const pool = require('./database');
const FinnHub = require('./api/finnhub');

const getCompaniesFromDatabase = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const companies = await conn.query('SELECT symbol FROM stock_prices;');
        const symbols = companies.map(entry => {
            return entry.symbol;
        });
        return symbols;
    } catch (err) {
        throw new Error(`Error in getting symbols: ${err}`);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

const updatePrices = async () => {
    const symbols = await getCompaniesFromDatabase();

    const calls = [];
    for (let i = 0; i <= symbols.length; i += 1) {
        const promiseCall = new Promise(resolve => {
            setTimeout(() => {
                FinnHub.getDataFromFinnhub('/quote', `&symbol=${symbols[i]}`)
                    .then(res => JSON.parse(res))
                    .then(result => {
                        if (result.t === 0) {
                            resolve(null);
                        } else {
                            const arr = [];
                            arr.push(result.c, result.t, symbols[i]);
                            resolve(arr);
                            console.log(arr);
                        }
                    });
            }, 2000 * i);
        });
        calls.push(promiseCall);
    }

    const results = await Promise.all(calls);

    const filteredResults = results.filter(el => {
        return el != null;
    });

    const conn = await pool.getConnection();
    conn.beginTransaction(); // Aloittaa batch transaction
    try {
        conn.batch(`UPDATE stock_prices SET current_price = ?, timestamp = FROM_UNIXTIME(?) WHERE symbol = ?;`, filteredResults);
        conn.commit();
    } catch (err) {
        console.log(err);
        conn.rollback(); // errortarkistus
    }
};

const companiesToDatabase = async () => {
    const companies = await FinnHub.getDataFromFinnhub('/stock/symbol', '&exchange=HE');
    const parsed = JSON.parse(companies);

    const mapped = parsed.map(entry => {
        return [entry.symbol, entry.description];
    });

    const conn = await pool.getConnection();
    conn.beginTransaction(); // Aloittaa batch transaction
    try {
        conn.batch(`INSERT INTO stock_prices (symbol, company_name) VALUES (?,?);`, mapped);
        conn.commit();
    } catch (err) {
        console.log(err);
        conn.rollback(); // errortarkistus
    }
};

// Cron jobi joka pyörii joka 20 minuutti
const job = new CronJob(
    '0 */20 * * * *',
    async () => {
        console.log('Starting updating prices');
        await updatePrices();
        console.log('Done');
    },
    null,
    true,
    'Europe/Helsinki',
);

exports.job = job;
exports.updatePrices = updatePrices;
exports.companiesToDatabase = companiesToDatabase;
