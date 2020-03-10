var https = require('https');
var config = require('../config/config');

const getDataFromFinnhub = (url, params) => {
    let urlWithParams = `/api/v1${url}?token=${config.finnhubKey}${params ? params : ''}`;
    return makeGetRequest(urlWithParams);
};

const makeGetRequest = url => {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            hostname: `finnhub.io`,
            path: url,
        };

        const request = https.request(options, res => {
            let body = '';
            res.on('error', e => {
                console.log(e);
                reject();
            });

            res.on('data', d => {
                body += d;
            });

            res.on('end', () => {
                //console.log(body);
                resolve(body);
            });
        });

        request.on('error', err => {
            console.log(`Error on a request to finnhub: ${err}`);
        });
        request.end();
    });
};

module.exports = {
    getDataFromFinnhub,
};
