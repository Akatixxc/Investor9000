import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { post } from '../api/apiHelper';

function Login() {
    const history = useHistory();
    const location = useLocation();

    const [inputs, setInputs] = useState({
        username: 'rasmus',
        password: 'password',
    });
    const { username, password } = inputs;

    //const [username, setUsername] = useState('rasmus');
    //const [password, setPassword] = useState('password');

    const handleLogin = e => {
        //disabloidaan default event, eli sivun täysi refresh
        e.preventDefault();

        post('/api/login', { body: JSON.stringify({ username: username, password: password }) }, false)
            .then(res => {
                const { from } = location.state || { from: { pathname: '/' } };
                if (res === 'success') {
                    history.replace(from);
                } else {
                    console.log('Login virhekäsittely');
                }
            })
            .catch(err => console.log(`Login failed: ${err}`));
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
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
            </form>
        </div>
    );
}

export default Login;
