import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Core/MainPage';
import Menu from './components/Core/Menu';
import PrivateRoute from './components/Auth/PrivaRoute';
import {DashBoard} from "./components/dashboard";

const Routes = () => (
    <Router>
        <Menu />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signin' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
            <PrivateRoute path="/dashboard" exact component={DashBoard}/>
        </Switch>
    </Router>
);

export default Routes;