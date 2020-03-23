const https = require('https');
const config = require('../config/config');

const makeGetRequest = url => {
    return new Promise((resolve, reject) => {
        const options = {
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
                // console.log(body);
                resolve(body);
            });
        });

        request.on('error', err => {
            reject();
            console.log(`Error on a request to finnhub: ${err}`);
        });
        request.end();
    });
};

const getDataFromFinnhub = (url, params) => {
    const urlWithParams = `/api/v1${url}?token=${config.finnhubKey}${params || ''}`;
    return makeGetRequest(urlWithParams);
};

module.exports = {
    getDataFromFinnhub,
};
