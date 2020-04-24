const chai = require('chai');
const stocks = require('../stocks');

chai.should();

const startingStocks = [
    {
        company_symbol: 'METSO.HE',
        company_name: 'Metso Oyj',
        stock_count: 4,
        price: 19,
        current_price: 23,
    },
    {
        company_symbol: 'OUT1V.HE',
        company_name: 'Outokumpu Oyj',
        stock_count: 32,
        price: 2,
        current_price: 2,
    },
    {
        company_symbol: 'OUT1V.HE',
        company_name: 'Outokumpu Oyj',
        stock_count: 32,
        price: 2,
        current_price: 2,
    },
];

const resultStocks = [
    {
        symbol: 'METSO.HE',
        name: 'Metso Oyj',
        count: 4,
        totalMarketValue: 92,
        totalBuyPrice: 76,
        profitPrecentage: 21.05263157894737,
    },
    {
        symbol: 'OUT1V.HE',
        name: 'Outokumpu Oyj',
        count: 64,
        totalMarketValue: 128,
        totalBuyPrice: 128,
        profitPrecentage: 0,
    },
];

describe('Stocks', () => {
    it('Result should equal precounted value', done => {
        const result = stocks.countTotalValues(startingStocks);
        result.should.eql(resultStocks);
        done();
    });
});
