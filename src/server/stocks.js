const { logger } = require('./logger');
const pool = require('./database');

const getStocksFromDatabase = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const companies = await conn.query('SELECT * FROM stock_prices;');

        const filtered = companies.filter(company => typeof company.current_price === 'number');

        return filtered;
    } catch (err) {
        logger.error(`Error in getting stocks: ${err}`);
        throw new Error(`Error in getting stocks: ${err}`);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

module.exports = { getStocksFromDatabase };
