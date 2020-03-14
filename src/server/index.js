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
    const user = req.user;
    console.log(user);
    FinnHub.getDataFromFinnhub('/stock/exchange', null).then(result => {
        res.status(200).json(result);
    });
});

app.get('/api/checkToken', middlewares.withAuth, function(req, res) {
    res.send(200).json('ok');
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

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
