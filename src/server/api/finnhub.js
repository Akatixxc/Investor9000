const https = require('https');
const config = require('../config/config');
const { logger } = require('../logger');

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
                logger.error(e);
                reject();
            });

            res.on('data', d => {
                body += d;
            });

            res.on('end', () => {
                resolve(body);
            });
        });

        request.on('error', err => {
            reject();
            logger.error(`Error on a request to finnhub: ${err}`);
        });
        request.end();
    });
};
/**
 * @param {*} url kyselyURL, esim /stock/exchange
 * @param {*} params kyselyyn liitettävät parametrit, pitää alkaa & - merkillä esim. &exchange=HE
 */
const getDataFromFinnhub = (url, params) => {
    const urlWithParams = `/api/v1${url}?token=${config.finnhubKey}${params || ''}`;
    return makeGetRequest(urlWithParams);
};

module.exports = {
    getDataFromFinnhub,
};
