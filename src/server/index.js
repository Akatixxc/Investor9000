/* eslint-disable no-unused-vars */
const https = require('https');
const fs = require('fs');
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { logger } = require('./logger');
const routes = require('./routes');
const middlewares = require('./middlewares');
const { job, initializeDatabase } = require('./jobs');

const UserService = require('./user');

const app = express();

app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

initializeDatabase();
job.start();

app.use('/api', routes);

app.get('/api/userdata', middlewares.withAuth, async (req, res) => {
    const { user } = req;

    const foundUser = await UserService.findUserByUsername(user.username);

    res.json({ firstname: foundUser.first_name, lastname: foundUser.last_name, balance: foundUser.balance });
});

app.use((req, res, next) => {
    const err = new Error(`Path ${req.originalUrl} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, _next) => {
    res.status(err.status || 500).json({ message: err.message });
});

if (process.env.NODE_ENV === 'production') {
    https
        .createServer(
            {
                key: fs.readFileSync(process.env.KEYPATH),
                cert: fs.readFileSync(process.env.CERTPATH),
            },
            app,
        )
        .listen(process.env.PORT, () => {
            logger.info(`Express HTTPS server running`);
        });
} else {
    app.listen(process.env.PORT || 8080, () => logger.info(`Listening on port ${process.env.PORT || 8080}!`));
}

module.exports = app;
