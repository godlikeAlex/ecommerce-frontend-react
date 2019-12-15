import React from "react";
import {Route, Redirect} from 'react-router-dom';
import { isAuth } from './index';

const AdminteRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isAuth() && isAuth().user.role === 1 ?
        (<Component {...props}/>)
        :
        (<Redirect to={{pathname: '/signin', state:{from: props.location} }}  />)
    } />
);

export default AdminteRoute;
