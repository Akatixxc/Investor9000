import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Market from './Market';

const useStyles = makeStyles({
    marketListHeader: {
        padding: '1rem',
        margin: '0',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: '1.75rem',
        fontWeight: '300',
        color: '#1F1F1F',
    },
    marketList: {
        width: '100%',
        maxWidth: '1200px',
        margin: '1rem auto 1rem auto',
    },
});

const MarketList = props => {
    const { stocks, onBuyStock } = props;
    const classes = useStyles();

    return (
        <div>
            <h1 className={classes.marketListHeader}>Yritykset</h1>
            <div className={classes.marketList}>
                {stocks ? (
                    stocks.map(row => (
                        <Market
                            key={row.symbol}
                            company={row.company_name}
                            symbol={row.symbol}
                            price={row.current_price}
                            lastUpdated={row.timestamp}
                            onBuyStock={onBuyStock}
                        />
                    ))
                ) : (
                    <Typography variant="h4">Loading...</Typography>
                )}
            </div>
        </div>
    );
};

export default MarketList;
