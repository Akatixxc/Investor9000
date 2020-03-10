const express = require('express');
const FinnHub = require('./api/finnhub');

const app = express();

app.use(express.static('dist'));

app.get('/api/getStockExchange', (req, res) => {
    FinnHub.getDataFromFinnhub('/stock/exchange', null).then(result => {
        res.status(200)
            .json(result)
            .end();
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
