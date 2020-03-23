const bcrypt = require('bcrypt');
const pool = require('./database');
const config = require('./config/config');

const findUserByUsername = async username => {
    let conn;
    try {
        conn = await pool.getConnection();
        const user = await conn.query('SELECT * FROM user WHERE LOWER(username) = LOWER(?);', username);
        return user[0];
    } catch (err) {
        throw new Error(`Error in getting user by username: ${err}`);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

const registerNewUser = async (username, password) => {
    let conn;

    const userExists = await findUserByUsername(username);

    if (userExists) {
        throw new Error(`user ${userExists.username} already exsists`);
    }

    try {
        conn = await pool.getConnection();
        const hash = await bcrypt.hash(password, config.hashSaltRounds);
        await conn.query('INSERT INTO user(username, password) VALUES (?, ?);', [username, hash]);
    } catch (err) {
        throw new Error(`Error in inserting new user to the database`);
    } finally {
        if (conn) {
            conn.end();
        }
    }
    return 0;
};

module.exports = {
    registerNewUser,
    findUserByUsername,
};
