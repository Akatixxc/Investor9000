import React from 'react';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../../public/images/investor9000.png';

const useStyles = makeStyles({
    headerImage: {
        height: '12rem',
        margin: 'auto',
        padding: '10px',
        objectFit: 'scale-down',
    },
    header: {
        textAlign: 'center',
        border: '1px solid black',
        background: 'linear-gradient(114deg, rgba(0, 0, 0, 1) 0%, rgba(45, 45, 45, 1) 100%)',
        color: '#ffffff',
    },
});

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.header}>
            <img src={Logo} className={classes.headerImage} alt="Investor9000" />
        </div>
    );
};

export default Header;
