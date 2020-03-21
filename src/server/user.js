const bcrypt = require('bcrypt');
const pool = require('./database');

const saltRounds = 10;

const registerNewUser = async (username, password) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const userExists = await findUserByUsername(username);

        if (userExists) {
            throw new Error(`user ${userExists.username} already exsists`);
        }

        let hash = await bcrypt.hash(password, saltRounds);
        await conn.query('INSERT INTO user(username, password) VALUES (?, ?)', [username, hash]);
    } catch (err) {
        throw new Error(`Error in inserting user`);
    } finally {
        if (conn) {
            return conn.end();
        }
    }
};

const findUserByUsername = async username => {
    let conn;
    try {
        conn = await pool.getConnection();
        const user = await conn.query('SELECT * FROM user WHERE lower(username) = lower(?)', username);
        return user[0];
    } catch (err) {
        throw new Error(`Error in getting user by username`);
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

module.exports = {
    registerNewUser,
    findUserByUsername,
};
