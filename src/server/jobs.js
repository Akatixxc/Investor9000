/* eslint-disable no-await-in-loop */
const { CronJob } = require('cron');
const { logger } = require('./logger');
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
        logger.error(`Error in getting symbols: ${err}`);
        throw new Error(`Error in getting symbols: ${err}`);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

const updatePrices = async () => {
    logger.info('Started to update prices');

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
                            arr.push(result.c, symbols[i]);
                            resolve(arr);
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
        conn.batch(`UPDATE stock_prices SET current_price = ?, timestamp = NOW() WHERE symbol = ?;`, filteredResults);
        conn.commit();
    } catch (err) {
        logger.error(`Error in inserting stock prices to the database: ${err}`);
        conn.rollback(); // errortarkistus
    }
    logger.info('Done');
};

const companiesToDatabase = async () => {
    logger.info('Adding companies to database.');

    const companies = await FinnHub.getDataFromFinnhub('/stock/symbol', '&exchange=HE');
    const parsed = JSON.parse(companies);

    const mapped = parsed.map(entry => {
        return [entry.symbol, entry.description];
    });

    const conn = await pool.getConnection();
    conn.beginTransaction(); // Aloittaa batch transaction
    try {
        conn.batch(`INSERT INTO stock_prices (symbol, company_name) VALUES (?,?);`, mapped);
        await conn.commit();
    } catch (err) {
        logger.error(`Error in inserting companies to the database: ${err}`);
        conn.rollback(); // errortarkistus
    }
    logger.info(`${mapped.length} companies added to databse`);
    updatePrices();
};

const initializeDatabase = async () => {
    const conn = await pool.getConnection();
    try {
        await conn.query(`CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(56) NOT NULL DEFAULT '',
            password TEXT NOT NULL DEFAULT '',
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            balance FLOAT NOT NULL DEFAULT 10000,
            PRIMARY KEY (username)
        )`);
        const { warningStatus } = await conn.query(`CREATE TABLE IF NOT EXISTS stock_prices (
            symbol VARCHAR(50) NOT NULL,
            company_name VARCHAR(50) NOT NULL,
            current_price FLOAT NULL DEFAULT NULL,
            timestamp TIMESTAMP NULL DEFAULT NULL,
            PRIMARY KEY (symbol)
        )`);
        conn.query(`CREATE TABLE IF NOT EXISTS bought_stocks (
            username VARCHAR(56) NOT NULL,
            company_symbol VARCHAR(50) NOT NULL,
            company_name VARCHAR(50) NOT NULL,
            stock_count INT(11) NOT NULL DEFAULT 0,
            price FLOAT NOT NULL DEFAULT 0,
            INDEX FK_bought_stocks_users (username) USING BTREE,
            CONSTRAINT FK_bought_stocks_users FOREIGN KEY (username) REFERENCES investor.users (username) ON UPDATE RESTRICT ON DELETE RESTRICT
        )`);
        conn.end();
        if (warningStatus === 0) {
            await companiesToDatabase();
        }
    } catch (err) {
        logger.error(`Error in creating new tables: ${err}`);
        conn.rollback();
    }
};

// Cron jobi joka pyörii joka 20 minuutti
const job = new CronJob(
    '0 */20 * * * *',
    async () => {
        await updatePrices();
    },
    null,
    true,
    'Europe/Helsinki',
);

exports.job = job;
exports.updatePrices = updatePrices;
exports.companiesToDatabase = companiesToDatabase;
exports.initializeDatabase = initializeDatabase;
