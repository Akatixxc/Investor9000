import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { post } from '../api/apiHelper';
import { parseResponseError } from '../helpers/helpers';
import './index.css';
import Header from './Header';

function Register() {
    const history = useHistory();
    const location = useLocation();

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const { username, password } = inputs;

    const handleRegister = e => {
        // disabloidaan default event, eli sivun täysi refresh
        e.preventDefault();

        post('/api/reqister', { body: JSON.stringify({ username, password }) }, false)
            .then(() => {
                const { from } = location.state || { from: { pathname: '/' } };
                history.replace(from);
            })
            .catch(err => {
                parseResponseError(err).then(error => console.log(`Registeration failed: ${error.message}`));
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
                <p>
                    <font color="black">Syötä tiedot. Tähdellä merkatut kentät ovat pakollisia.</font>
                </p>
            </div>
            <form noValidate autoComplete="off">
                <TextField id="firstname" name="firstname" label="Etunimi" onChange={handleChange} required />
                <br />
                <TextField id="lastname" name="lastname" label="Sukunimi" onChange={handleChange} required />
                <br />
                <TextField id="username" name="username" label="Sähköposti" value={username} onChange={handleChange} required />
                <br />
                <TextField id="password" name="password" label="Salasana" type="password" value={password} onChange={handleChange} minlength="8" required />
                <br />
                <TextField id="confirm_password" name="password" label="Vahvista salasana" type="password" minlength="8" required />
                <br />
                <Button type="login" variant="contained" onClick={handleRegister}>
                    Luo tunnukset
                </Button>
            </form>
        </div>
    );
}

export default Register;
