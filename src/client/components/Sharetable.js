import React, { PureComponent } from 'react';
import './index.css';

// Käyttäjän omat sijoitukset
class Table extends PureComponent {
    render() {
        const { shares } = this.props;

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
