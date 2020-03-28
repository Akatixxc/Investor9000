import React from 'react';
import './index.css';

// Käyttäjän nimi, pääoma ja kehitys
const User = ({ firstname, lastname, date, capital, percent, balance }) => {
    return (
        <section>
            <p>
                {firstname} {lastname} <br />
                {date}
            </p>
            <div className="mydiv">
                <h1>
                    Pääoma <br />
                    {capital}
                </h1>
            </div>
            <div className="mydiv">
                <h1>
                    Kehitys <br />
                    {percent}
                </h1>
            </div>
            <div className="mydiv">
                <h1>
                    Saldo <br />
                    {balance}
                </h1>
            </div>
        </section>
    );
};

export default User;
