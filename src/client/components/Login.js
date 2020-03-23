import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { post } from '../api/apiHelper';
import { parseResponseError } from '../helpers/helpers';

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

        post('/api/login', { body: JSON.stringify({ username, password }) }, false)
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
            <form noValidate autoComplete="off">
                <TextField id="username" name="username" label="Username" value={username} onChange={handleChange} />
                <br />
                <TextField id="password" name="password" label="Password" type="password" value={password} onChange={handleChange} />
                <br />
                <Button variant="contained" onClick={handleLogin}>
                    Submit
                </Button>
                <br />
                <Link to="/register">Not yet a user?</Link>
            </form>
        </div>
    );
}

export default Login;
