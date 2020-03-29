import React, { Component } from 'react';
import { get } from '../api/apiHelper';
import './index.css';

// Käyttäjän omat sijoitukset
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shares: [],
        };
    }

    componentDidMount() {
        get('/api/stocks/userAssets', null, true).then(result => {
            this.setState({ shares: result });
            console.log(result);
        });
    }

    render() {
        const { shares } = this.state;

        return (
            <div>
                <h1 id="title">Oma sijoitukset</h1>
                <table id="shares">
                    <tbody>
                        <tr>
                            <th>NIMI</th>
                            <th>MÄÄRÄ</th>
                            <th>ARVO</th>
                            <th>TUOTTO</th>
                        </tr>
                        {shares.map(row => (
                            <tr key={row.symbol}>
                                <td>{row.name}</td>
                                <td>{row.count}</td>
                                <td>{row.totalMarketValue}</td>
                                <td>{row.profitPrecentage}</td>
                                <td>
                                    <button id="sell" type="submit">
                                        Myy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
