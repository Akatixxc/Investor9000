const express = require('express');

const StockService = require('./stocks');
const middlewares = require('./middlewares');

const router = express.Router();

router.get('/getStocks', middlewares.withAuth, async (req, res) => {
    const stocks = await StockService.getStocksFromDatabase();
    res.json(stocks);
});

router.get('/userAssets', middlewares.withAuth, async (req, res) => {
    const { user } = req;
    const assets = await StockService.getUserAssets(user.username);
    res.json(assets);
});

router.post('/buy', middlewares.withAuth, async (req, res, next) => {
    const { user } = req;
    const { symbol, stockCount } = req.body;

    try {
        await StockService.buyStock(user.username, symbol, stockCount);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

router.post('/sell', middlewares.withAuth, async (req, res, next) => {
    const { user } = req;
    const { symbol } = req.body;

    try {
        await StockService.sellStock(user.username, symbol);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
