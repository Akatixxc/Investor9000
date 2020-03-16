import React, { Component } from 'react';
import { get } from '../api/apiHelper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import history from './history';

export default class StockExhanges extends Component {
    constructor() {
        super();
        this.state = {
            stockExhange: null,
        };
    }

    componentDidMount() {
        get('/api/getStockExchange', null, true)
            //Jostain syystä result on textimuodossa eikä jsonina, joten se pitää parsia vielä erikseen, tätä voisi tutkia, en jaksanut enempää
            .then(result => this.setState({ stockExhange: JSON.parse(result), loggedIn: true }));
    }

    render() {
        const { stockExhange } = this.state;
        return (
            <div>
                <Button
                    variant="contained"
                    onClick={() => {
                        get(`/api/logout`, null, true).then(history.push('/login'));
                    }}
                >
                    Logout
                </Button>
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
