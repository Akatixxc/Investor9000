import React, { Component } from 'react';
import './index.css';

// Käyttäjän omat sijoitukset
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shares: [
                { nimi: 'Sampo', määrä: 15, arvo: 219, tuotto: 4.17, myy: 'Myy' },
                { nimi: 'Nordea', määrä: 20, arvo: 189, tuotto: -3.19, myy: 'Myy' },
                { nimi: 'Fortum', määrä: 100, arvo: 916, tuotto: -8.9, myy: 'Myy' },
                { nimi: 'Yritys X', määrä: 89, arvo: 725, tuotto: 0.63, myy: 'Myy' },
            ],
        };
    }

    renderTableData() {
        return this.state.shares.map((share, index) => {
            const { määrä, nimi, arvo, tuotto, myy } = share;
            return (
                <tr key={nimi}>
                    <td>{nimi}</td>
                    <td>{määrä}</td>
                    <td>{arvo}</td>
                    <td>{tuotto}</td>
                    <td>
                        <button type="sell">{myy}</button>
                    </td>
                </tr>
            );
        });
    }

    renderTableHeader() {
        const header = Object.keys(this.state.shares[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>;
        });
    }

    render() {
        return (
            <div>
                <h1 id="title">Oma sijoitukset</h1>
                <table id="shares">
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
