import React from 'react';
import './index.css';

const Header = props => {
    return (
        <div className="header">
            <h2>{props.header}</h2>
        </div>
    );
};

export default Header;
