import React, { Component } from 'react';
import { get } from './api/apiHelper';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            stockExhange: null,
        };
    }

    componentDidMount() {
        get('/api/getStockExchange', null)
            //Jostain syystä result on textimuodossa eikä jsonina, joten se pitää parsia vielä erikseen, tätä voisi tutkia, en jaksanut enempää
            .then(result => this.setState({ stockExhange: JSON.parse(result) }));
    }

    render() {
        const { stockExhange } = this.state;
        return (
            <div>
                {stockExhange ? (
                    <table>
                        {stockExhange.map(row => (
                            <tr key={row.code}>
                                <td>{row.code}</td>
                                <td>{row.name}</td>
                                <td>{row.currency}</td>
                            </tr>
                        ))}
                    </table>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        );
    }
}
