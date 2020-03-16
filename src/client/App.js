import React from 'react';

import { Router, Switch, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import StockExchanges from './components/StockExchanges';
import history from './components/history';

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/">
                    <StockExchanges />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default App;
