require('dotenv').config();

module.exports = {
    finnhubKey: process.env.FINNHUB_KEY,
    jwtTokenSecret: process.env.JWT_TOKEN_SECRET,
};
