/* eslint-disable no-unused-vars */
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const FinnHub = require('./api/finnhub');
const UserService = require('./user');
const middlewares = require('./middlewares');
const config = require('./config/config');

const app = express();

app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/getStockExchange', middlewares.withAuth, (req, res) => {
    // with auth middlewaresssa asetetaan käyttäjä jota voidaan käyttää näin
    // const { user } = req;

    FinnHub.getDataFromFinnhub('/stock/exchange', null).then(result => {
        res.json(result);
    });
});

app.get('/api/checkToken', (req, res, next) => {
    const authHeader = req.cookies.jwtToken;
    if (authHeader) {
        jwt.verify(authHeader, config.jwtTokenSecret, error => {
            if (error) {
                const err = new Error('JWT ei validi');
                err.status = 401;
                next(err);
            }
            res.json(true);
        });
    } else {
        const err = new Error('JWT puuttuu');
        err.status = 401;
        next(err);
    }
});

app.post('/api/login', async (req, res, next) => {
    const { username, password } = req.body;

    const foundUser = await UserService.findUserByUsername(username);

    if (foundUser) {
        const passwordsMatch = await bcrypt.compare(password, foundUser.password);

        if (passwordsMatch) {
            const accessToken = jwt.sign({ username: foundUser.username }, config.jwtTokenSecret);
            res.cookie('jwtToken', accessToken, { httpOnly: true }).sendStatus(204);
        } else {
            const err = new Error('Käyttäjänimi tai salasana väärin');
            err.status = 403;
            next(err);
        }
    } else {
        const err = new Error('Käyttäjänimi tai salasana väärin');
        err.status = 403;
        next(err);
    }
});

app.post('/api/reqister', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        await UserService.registerNewUser(username, password);
        res.sendStatus(204);
    } catch (error) {
        error.status = 400;
        next(error);
    }
});

app.get('/api/logout', middlewares.withAuth, (req, res) => {
    res.clearCookie('jwtToken').sendStatus(204);
});

app.use((req, res, next) => {
    const err = new Error(`Path ${req.originalUrl} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, _next) => {
    res.status(err.status || 500).json({ message: err.message });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
