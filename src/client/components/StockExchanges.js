import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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
        this.state = {};
    }

    componentDidMount() {
        get('/api/getStockExchange', null, true)
            // Jostain syystä result on textimuodossa eikä jsonina, joten se pitää parsia vielä erikseen, tätä voisi tutkia, en jaksanut enempää
            .then(result => console.log(result));
    }

    render() {
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
                    type="verify"
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
                        <button type="verify">Vahvista osto</button>
                    </Market>
                    <Market title={company.name}>
                        <p>
                            Hinta: {company.price} <br /> Kehitys: {company.percent}{' '}
                        </p>
                        <Increment min={0} max={100} />
                        <p>5 x 23,55 € = 117,75 € </p>
                        <button type="verify">Vahvista osto</button>
                    </Market>
                </div>
            </div>
        );
    }
}
