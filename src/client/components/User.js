import React from 'react';
import './index.css';

// Käyttäjän nimi, pääoma ja kehitys
const User = ({ firstname, lastname, date, capital, amount, progress, percent, balance, bamount }) => {
    return (
        <section>
            <p>
                {firstname} {lastname} <br />
                {date}
            </p>
            <div className="mydiv">
                <h1>
                    {capital} <br />
                    {amount}
                </h1>
            </div>
            <div className="mydiv">
                <h1>
                    {progress} <br />
                    {percent}
                </h1>
            </div>
            <div className="mydiv">
                <h1>
                    {balance} <br />
                    {bamount}
                </h1>
            </div>
        </section>
    );
};

export default User;
