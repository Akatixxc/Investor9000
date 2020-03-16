const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const FinnHub = require('./api/finnhub');
const middlewares = require('./middlewares');
const config = require('./config/config');

const app = express();

app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const users = [
    {
        username: 'rasmus',
        password: 'password',
    },
];

app.get('/api/getStockExchange', middlewares.withAuth, (req, res) => {
    //with auth middlewaresssa asetetaan käyttäjä jota voidaan käyttää näin
    const user = req.user;
    FinnHub.getDataFromFinnhub('/stock/exchange', null).then(result => {
        res.json(result);
    });
});

app.get('/api/checkToken', (req, res) => {
    const authHeader = req.cookies.jwtToken;
    if (authHeader) {
        jwt.verify(authHeader, config.jwtTokenSecret, (err, user) => {
            if (err) {
                return res.json(false);
            }
            res.json(true);
        });
    } else {
        res.json(false);
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => {
        return u.username === username && u.password === password;
    });

    if (user) {
        const accessToken = jwt.sign({ username: user.username }, config.jwtTokenSecret);

        res.cookie('jwtToken', accessToken, { httpOnly: true }).json('success');
    } else {
        res.json('Käyttäjänimi tai salasana väärin');
    }
});

app.get('/api/logout', middlewares.withAuth, (req, res) => {
    res.clearCookie('jwtToken').json('success');
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
