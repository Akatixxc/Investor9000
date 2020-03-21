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

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await UserService.findUserByUsername(username);

    if (foundUser) {
        const passwordsMatch = await bcrypt.compare(password, foundUser.password);

        if (passwordsMatch) {
            const accessToken = jwt.sign({ username: foundUser.username }, config.jwtTokenSecret);

            res.cookie('jwtToken', accessToken, { httpOnly: true }).json('success');
        } else {
            res.json('Käyttäjänimi tai salasana väärin');
        }
    } else {
        res.json('Käyttäjänimi tai salasana väärin');
    }
});

app.post('/api/reqister', async (req, res) => {
    const { username, password } = req.body;
    try {
        await UserService.registerNewUser(username, password);
        res.json('success');
    } catch (err) {
        console.log('Error in registering user: ' + err);
        res.json('error');
    }
});

app.get('/api/logout', middlewares.withAuth, (req, res) => {
    res.clearCookie('jwtToken').json('success');
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
