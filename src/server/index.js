/* eslint-disable no-unused-vars */
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { logger } = require('./logger');
const routes = require('./routes');
const FinnHub = require('./api/finnhub');
const middlewares = require('./middlewares');
const { job, initializeDatabase } = require('./jobs');

const app = express();

app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

initializeDatabase();
job.start();

app.use('/api', routes);

app.get('/api/getStockExchange', middlewares.withAuth, (req, res) => {
    // with auth middlewaresssa asetetaan käyttäjä jota voidaan käyttää näin
    // const { user } = req;

    FinnHub.getDataFromFinnhub('/stock/exchange', null).then(result => {
        res.json(result);
    });
});

app.use((req, res, next) => {
    const err = new Error(`Path ${req.originalUrl} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, _next) => {
    res.status(err.status || 500).json({ message: err.message });
});

app.listen(process.env.PORT || 8080, () => logger.info(`Listening on port ${process.env.PORT || 8080}!`));
