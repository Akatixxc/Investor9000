import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { post } from '../api/apiHelper';
import { parseResponseError } from '../helpers/helpers';
import './index.css';
import Header from './Header';

function Login() {
    const history = useHistory();
    const location = useLocation();

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const { username, password } = inputs;

    const handleLogin = e => {
        // disabloidaan default event, eli sivun täysi refresh
        e.preventDefault();

        post('/api/auth/login', { body: JSON.stringify({ username, password }) }, false)
            .then(() => {
                const { from } = location.state || { from: { pathname: '/' } };
                history.replace(from);
            })
            .catch(err => {
                parseResponseError(err).then(error => console.log(`Login failed: ${error.message}`));
            });
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(input => ({ ...input, [name]: value }));
    }

    return (
        <div>
            <Header header="Investor9000" />
            <div className="center">
                <p>Tervetuloa sijoittamaan!</p>
            </div>
            <form noValidate autoComplete="off">
                <TextField type="text" id="username" name="username" label="Käyttäjätunnus" value={username} onChange={handleChange} />
                <br />
                <TextField type="password" id="password" name="password" label="Salasana" value={password} onChange={handleChange} />
                <br />
                <Button type="submit" variant="contained" onClick={handleLogin}>
                    Kirjaudu sisään
                </Button>
                <br />
                <Link to="/register">Luo uudet tunnukset täältä</Link>
            </form>
        </div>
    );
}

export default Login;
