import React, { useState } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import InputNumber from './InputNumber';

import { post } from '../api/apiHelper';
import { parseResponseError, numberFormat } from '../helpers/helpers';

const useStyles = makeStyles({
    panelHeader: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        textAlign: 'left',
        fontFamily: 'Roboto',
        fontSize: '1rem',
        border: '1px solid #9a9a9a',
        color: 'inherit',
        padding: '1rem',
        cursor: 'pointer',
        background: '#f0f0f0',
        marginTop: '0.5rem',
        '&:focus': {
            background: '#d9d9d9',
            outline: 'none',
        },
    },
    panelHeaderIcon: {
        width: '1.25rem',
        height: '1.25rem',
        marginLeft: 'auto',
    },
    panelBody: {
        borderLeft: '1px solid #c5c5c5',
        borderRight: '1px solid #c5c5c5',
        borderBottom: '1px solid #c5c5c5',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'row',
    },
    panelBodyHidden: {
        display: 'none',
    },
    panelBodyLeft: {
        float: 'left',
        fontFamily: 'Roboto',
        margin: '0',
        '& h1': {
            margin: '0',
            fontSize: '1.5rem',
            fontWeight: '400',
            color: '#272727',
        },
        '& p': {
            margin: '0',
            fontSize: '0.875rem',
            color: '#606060',
        },
    },
    panelBodyRight: {
        float: 'right',
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'row',
    },
    panelBodyBuyButton: {
        backgroundColor: '#4caf50',
        color: 'white',
        margin: 'auto 0 auto 1rem',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontSize: '1rem',
        width: '8rem',
        '&:hover': {
            background: '#489c4b',
        },
    },
});

const PlusIcon = () => {
    const classes = useStyles();
    return (
        <span className={classes.panelHeaderIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path fill="currentColor" d="M14,7H9V2A1,1,0,0,0,7,2V7H2A1,1,0,0,0,2,9H7v5a1,1,0,0,0,2,0V9h5a1,1,0,0,0,0-2Z" />
            </svg>
        </span>
    );
};

const MinusIcon = () => {
    const classes = useStyles();
    return (
        <span className={classes.panelHeaderIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path fill="currentColor" d="M14,9H2A1,1,0,0,1,2,7H14a1,1,0,0,1,0,2Z" />
            </svg>
        </span>
    );
};

const PanelHeader = props => {
    const { handleToggle, isExpanded, children } = props;
    const classes = useStyles();
    return (
        <button type="button" className={classes.panelHeader} onClick={handleToggle} aria-expanded={isExpanded}>
            {children}
            {isExpanded ? <MinusIcon /> : <PlusIcon />}
        </button>
    );
};

const PanelBody = props => {
    const { children, isExpanded } = props;
    const classes = useStyles();
    return <div className={isExpanded ? classes.panelBodyHidden : classes.panelBody}>{children}</div>;
};

const Panel = props => {
    const { company, symbol, price, lastUpdated, onBuyStock, openDefault: initialOpenDefault, enqueueSnackbar } = props;
    const [stockCount, setStockCount] = useState(50);
    const [isExpanded, setIsExpanded] = useState(initialOpenDefault);
    const [showPrice, setShowPrice] = useState(true);
    const date = moment(lastUpdated);
    const formprice = numberFormat(price);
    const classes = useStyles();

    const updateStockCount = value => {
        setStockCount(value);
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleShowPrice = value => {
        setShowPrice(value);
    };

    const buyStock = () => {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(stockCount) || stockCount === '') {
            enqueueSnackbar(`Virhe syötteessä ${stockCount}`, { variant: 'error' });
        } else {
            post('/api/stocks/buy', { body: JSON.stringify({ symbol, stockCount }) }, true)
                .then(() => {
                    enqueueSnackbar(`${stockCount} osaketta yritykseltä ${company} ostettu onnistuneesti`, { variant: 'success' });
                    onBuyStock();
                })
                .catch(err => {
                    parseResponseError(err, 'Virhe ostaessa osaketta').then(error => enqueueSnackbar(error.message, { variant: 'error' }));
                });
        }
    };

    return (
        <div className="panel">
            <PanelHeader handleToggle={handleToggle} isExpanded={isExpanded}>
                {company}
            </PanelHeader>
            <PanelBody isExpanded={!isExpanded}>
                <div className={classes.panelBodyLeft}>
                    <h1>Hinta: {formprice} € </h1>
                    <p> Päivitetty {date.format('HH:mm DD.MM.YYYY')}</p>
                </div>
                <div className={classes.panelBodyRight}>
                    <InputNumber min={1} max={500} amount={stockCount} onChangeStockCount={updateStockCount} />
                    <Button
                        className={classes.panelBodyBuyButton}
                        type="submit"
                        onMouseEnter={() => toggleShowPrice(false)}
                        onMouseLeave={() => toggleShowPrice(true)}
                        onClick={buyStock}
                    >
                        {showPrice ? `${numberFormat(stockCount * formprice)}€` : 'OSTA'}
                    </Button>
                </div>
            </PanelBody>
        </div>
    );
};

export default withSnackbar(Panel);
