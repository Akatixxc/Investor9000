import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { get, post } from './api/apiHelper';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            stockExhange: null,
            loggedIn: false,
            username: 'rasmus',
            password: 'password',
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /* componentDidMount() {
        get('/api/getStockExchange', null, true)
            //Jostain syystä result on textimuodossa eikä jsonina, joten se pitää parsia vielä erikseen, tätä voisi tutkia, en jaksanut enempää
            .then(result => this.setState({ stockExhange: JSON.parse(result) }));
    } */

    handleLogin = () => {
        post('/api/login', { body: JSON.stringify({ username: this.state.username, password: this.state.password }) }, false).then(res => {
            console.log(res);
            if (res === 'success') {
                get('/api/getStockExchange', null, true)
                    //Jostain syystä result on textimuodossa eikä jsonina, joten se pitää parsia vielä erikseen, tätä voisi tutkia, en jaksanut enempää
                    .then(result => this.setState({ stockExhange: JSON.parse(result), loggedIn: true }));
            }
        });
    };

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    render() {
        const { stockExhange, loggedIn, username, password } = this.state;
        return (
            <div>
                {loggedIn ? (
                    stockExhange ? (
                        <table>
                            <tbody>
                                {stockExhange.map(row => (
                                    <tr key={row.name}>
                                        <td>{row.code}</td>
                                        <td>{row.name}</td>
                                        <td>{row.currency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h1>Loading...</h1>
                    )
                ) : (
                    <form noValidate autoComplete="off">
                        <TextField id="username" name="username" label="Username" value={username} onChange={this.handleChange} />
                        <br />
                        <TextField id="password" name="password" label="Password" type="password" value={password} onChange={this.handleChange} />
                        <br />
                        <Button variant="contained" onClick={this.handleLogin}>
                            Submit
                        </Button>
                    </form>
                )}
            </div>
        );
    }
}
