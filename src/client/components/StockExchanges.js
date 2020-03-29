import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withSnackbar } from 'notistack';
import moment from 'moment';
import { get } from '../api/apiHelper';
import './index.css';
import Header from './Header';
import User from './User';
import Sharetable from './Sharetable';
import Market from './Market';
import { parseResponseError } from '../helpers/helpers';

class StockExhanges extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            balance: 0,
            stocks: [],
        };
    }

    componentDidMount() {
        get('/api/userData', null, true)
            .then(result =>
                this.setState({
                    firstname: result.firstname,
                    lastname: result.lastname,
                    balance: result.balance,
                }),
            )
            .catch(err => {
                parseResponseError(err, 'Virhe hakiessa käyttäjän tietoja').then(error => console.log(error));
            });
        get('/api/stocks', null, true)
            .then(result =>
                this.setState({
                    stocks: result,
                }),
            )
            .catch(err => {
                parseResponseError(err, 'Virhe hakiessa tietoja osakkeista').then(error => console.log(error));
            });
    }

    render() {
        const { firstname, lastname, balance, stocks } = this.state;
        const today = moment().format('DD-MM-YYYY');

        return (
            <div>
                <Header header="Investor9000" />

                <User firstname={firstname} lastname={lastname} balance={balance} date={today} capital={8900} percent="-3,14 %" />
                <Sharetable />
                <div className="wrapper">
                    {stocks ? (
                        stocks.map(row => (
                            <Market key={row.symbol} company={row.company_name} symbol={row.symbol} price={row.current_price} lastUpdated={row.timestamp} />
                        ))
                    ) : (
                        <Typography variant="h4">Loading...</Typography>
                    )}
                </div>
            </div>
        );
    }
}
export default withSnackbar(StockExhanges);
