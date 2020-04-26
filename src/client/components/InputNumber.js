import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    inputNumber: {
        position: 'relative',
        width: '100px',
        height: '40px',
        overflow: 'hidden',
        borderRadius: '20px',
        margin: 'auto 0 auto 0',
        border: '1px solid #bbbbbb',
        fontFamily: 'Roboto',
    },
    inputNumberInput: {
        position: 'absolute',
        left: '50%',
        marginLeft: '-20px',
        display: 'inline-block',
        backgroundColor: '#f0f0f0',
        height: '100%',
        width: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        lineHeight: '40px',
        fontSize: '16px',
        color: '#1f1f1f',
        border: '0px',
        boxSizing: 'border-box',
        '&:focus': {
            outline: '0',
        },
    },
    inputNumberButtonMinus: {
        display: 'inline-block',
        width: '50px',
        height: '100%',
        border: 'none',
        color: '#1f1f1f',
        fontSize: '20px',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        transition: 'background-color 0.2s ease',
        paddingRight: '20px',
        '&:hover': {
            background: '#4caf50',
            color: 'white',
        },
        '&:focus': {
            outline: '0',
        },
    },
    inputNumberButtonPlus: {
        display: 'inline-block',
        width: '50px',
        height: '100%',
        border: 'none',
        color: '#1f1f1f',
        fontSize: '20px',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        transition: 'background-color 0.2s ease',
        paddingLeft: '20px',
        '&:hover': {
            background: '#4caf50',
            color: 'white',
        },
        '&:focus': {
            outline: '0',
        },
    },
});

const InputNumber = props => {
    const { min, max, amount: initialAmount, onChangeStockCount } = props;
    const [amount, setAmount] = useState(initialAmount);
    const classes = useStyles();

    const changeAmount = inputAmount => {
        if (inputAmount === '') {
            setAmount('');
            onChangeStockCount('');
        } else if (inputAmount < min) {
            setAmount(min);
            onChangeStockCount(min);
        } else if (inputAmount > max) {
            setAmount(max);
            onChangeStockCount(max);
        } else {
            setAmount(inputAmount);
            onChangeStockCount(inputAmount);
        }
    };

    return (
        <div className={classes.inputNumber}>
            <button className={classes.inputNumberButtonMinus} type="button" onClick={() => changeAmount(parseInt(amount, 10) - 1)}>
                &minus;
            </button>
            <input className={classes.inputNumberInput} type="text" value={amount} onChange={event => changeAmount(event.target.value)} />
            <button className={classes.inputNumberButtonPlus} type="button" onClick={() => changeAmount(parseInt(amount, 10) + 1)}>
                &#43;
            </button>
        </div>
    );
};

export default InputNumber;
