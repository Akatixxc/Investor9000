import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { post } from '../api/apiHelper';

function Register() {
    const history = useHistory();
    const location = useLocation();

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const { username, password } = inputs;

    const handleRegister = e => {
        //disabloidaan default event, eli sivun täysi refresh
        e.preventDefault();

        post('/api/reqister', { body: JSON.stringify({ username: username, password: password }) }, false)
            .then(res => {
                const { from } = location.state || { from: { pathname: '/' } };
                if (res === 'success') {
                    history.replace(from);
                } else {
                    console.log('Register virhekäsittely');
                }
            })
            .catch(err => console.log(`Registeration failed: ${err}`));
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    return (
        <div>
            <h1>Register as a new User</h1>
            <form noValidate autoComplete="off">
                <TextField id="username" name="username" label="Username" value={username} onChange={handleChange} />
                <br />
                <TextField id="password" name="password" label="Password" type="password" value={password} onChange={handleChange} />
                <br />
                <Button variant="contained" onClick={handleRegister}>
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Register;
