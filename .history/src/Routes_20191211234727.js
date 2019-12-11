import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

const Routes = () => (
    <div>
        <Switch>
            <Route path='/signin' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
        </Switch>
    </div>
);

export default Routes;