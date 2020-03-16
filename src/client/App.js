import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import StockExchanges from './components/StockExchanges';

function App() {
    return (
        <Router>
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
