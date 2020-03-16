const jwt = require('jsonwebtoken');
const config = require('./config/config');

const withAuth = (req, res, next) => {
    const authHeader = req.cookies.jwtToken;

    if (authHeader) {
        jwt.verify(authHeader, config.jwtTokenSecret, (err, user) => {
            if (err) {
                return res.status(401).json('JWT ei validi');
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json('JWT puuttuu');
    }
};

module.exports = { withAuth };
