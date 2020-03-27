import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

const Header = props => {
    const { header } = props;
    return (
        <div className="header">
            <h2>{header}</h2>
        </div>
    );
};

Header.propTypes = {
    header: PropTypes.string,
};

Header.defaultProps = {
    header: 'investor',
};

export default Header;
