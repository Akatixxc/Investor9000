import React from 'react';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { get } from '../api/apiHelper';
import history from './history';

const useStyles = makeStyles({
    user: {
        background: '#c0c0c0',
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '0.1px solid black',
        '& p': {
            objectFit: 'scale-down',
            margin: '1rem auto 1rem auto',
            justifyContent: 'center',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: 'Roboto',
            fontSize: '1rem',
            letterSpacing: '0.03rem',
            lineHeight: '1.5',
            fontWeight: '450',
            color: '#1F1F1F',
        },
        '& button': {
            margin: '1rem auto 1rem auto',
        },
    },
});

// Käyttäjän nimi, pääoma ja kehitys
const User = ({ firstname, lastname, capital, date, percent, balance }) => {
    const classes = useStyles();

    return (
        <div className={classes.user}>
            <p>
                {firstname} {lastname} <br />
                {date}
            </p>
            <p>
                Pääoma <br />
                {capital} €
            </p>
            <p>
                Kehitys <br />
                {percent} %
            </p>
            <p>
                Saldo <br />
                {balance} €
            </p>
            <Button
                variant="contained"
                onClick={e => {
                    e.preventDefault();
                    get(`/api/auth/logout`, null, true).then(history.push('/login'));
                }}
            >
                Logout
            </Button>
        </div>
    );
};

export default User;
