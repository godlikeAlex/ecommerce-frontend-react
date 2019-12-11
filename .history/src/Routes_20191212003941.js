import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Core/MainPage';

const Routes = () => (
    <Router>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signin' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
        </Switch>
    </Router>
);

export default Routes;