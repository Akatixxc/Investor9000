import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { get } from '../api/apiHelper';
import history from './history';
import './index.css';
import Header from './Header';
import User from './User';
import Sharetable from './Sharetable';
import Market from './Market';
import Increment from './Increment';

const user = {
    firstname: 'Sampo',
    lastname: 'Sijoittaja',
    date: '24.03.2020',
    capital: 'Pääoma',
    amount: '8900 €',
    progress: 'Kehitys',
    percent: '-3,14 %',
    balance: 'Saldo',
    bamount: '680 €',
};

const company = {
    name: 'Yritys X',
    price: 23.55,
    percent: -15.2,
};

export default class StockExhanges extends Component {
    constructor() {
        super();
        this.state = {
            stockExhange: null,
        };
    }

    componentDidMount() {
        get('/api/getStockExchange', null, true)
            // Jostain syystä result on textimuodossa eikä jsonina, joten se pitää parsia vielä erikseen, tätä voisi tutkia, en jaksanut enempää
            .then(result => this.setState({ stockExhange: JSON.parse(result) }));
    }

    render() {
        const { stockExhange } = this.state;
        return (
            <div>
                <Header header="Investor9000" />

                <User
                    firstname={user.firstname}
                    lastname={user.lastname}
                    date={user.date}
                    capital={user.capital}
                    amount={user.amount}
                    progress={user.progress}
                    percent={user.percent}
                    balance={user.balance}
                    bamount={user.bamount}
                />
                <Button
                    type="submit"
                    variant="contained"
                    onClick={() => {
                        get(`/api/logout`, null, true).then(history.push('/login'));
                    }}
                >
                    Logout
                </Button>
                <Sharetable />
                <div className="wrapper">
                    <Market title={company.name}>
                        <p>
                            Hinta: {company.price} <br /> Kehitys: {company.percent}{' '}
                        </p>
                        <Increment min={0} max={100} />
                        <p>5 x 23,55 € = 117,75 € </p>
                        <button type="submit">Vahvista osto</button>
                    </Market>
                </div>
                {stockExhange ? (
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {stockExhange.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.code}</TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.currency}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <CircularProgress />
                )}
            </div>
        );
    }
}
