import React from 'react';
import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { post } from '../api/apiHelper';
import { parseResponseError, numberFormat } from '../helpers/helpers';

const useStyles = makeStyles({
    sharetableHeader: {
        padding: '1rem',
        margin: '0',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: '1.75rem',
        fontWeight: '300',
        color: '#1F1F1F',
    },
    sharetableLine: {
        margin: '0',
        borderBottom: '1px solid #9a9a9a',
    },
    sharetableHr: {
        margin: '0',
    },
    sharetableTable: {
        width: '100%',
        maxWidth: '1200px',
        fontFamily: 'Roboto',
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        '& th': {
            textAlign: 'left',
            textTransform: 'uppercase',
            fontSize: '1rem',
            letterSpacing: '0.04rem',
            lineHeight: '1.5',
            fontWeight: '450',
            color: '#1F1F1F',
        },
    },
    sharetableButton: {
        width: '50px',
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '5px',
        margin: '0 0 8px',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        float: 'right',
        '&:hover': {
            backgroundColor: '#489c4b',
        },
    },
});

// Käyttäjän omat sijoitukset
const Table = props => {
    const { shares, enqueueSnackbar, onSellStock } = props;
    const classes = useStyles();

    const sellStock = (symbol, company) => {
        post('/api/stocks/sell', { body: JSON.stringify({ symbol }) }, true)
            .then(() => {
                enqueueSnackbar(`Yrityksen ${company} osakkeet myyty onnistuneesti`, { variant: 'success' });
                onSellStock();
            })
            .catch(err => {
                parseResponseError(err, 'Virhe osakkeen myynnissä').then(error => enqueueSnackbar(error.message, { variant: 'error' }));
            });
    };

    return (
        <div>
            <h1 className={classes.sharetableHeader}>Omat sijoitukset</h1>
            <div className={classes.sharetableLine} />
            <table className={classes.sharetableTable}>
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
                            <td>{numberFormat(row.totalMarketValue)} €</td>
                            <td>{numberFormat(row.profitPrecentage)} %</td>
                            <td>
                                <button type="submit" className={classes.sharetableButton} onClick={() => sellStock(row.symbol, row.name)}>
                                    Myy
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default withSnackbar(Table);
