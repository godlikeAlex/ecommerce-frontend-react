import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Core/MainPage';
import Menu from './components/Core/Menu';
import PrivateRoute from './components/Auth/PrivaRoute';
import AdminRoute from './components/Auth/AdminRoute';
import {DashBoard, AdminDashBoard} from "./components/dashboard";
import {AddCategory, CreateProduct} from './components/admin';
import Shop from "./components/Core/Shop";


const Routes = () => (
    <Router>
        <Menu />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/shop' exact component={Shop} />
            <Route path='/signin' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
            <PrivateRoute path="/dashboard" exact component={DashBoard}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
            <AdminRoute path="/create/category" exact component={AddCategory}/>
            <AdminRoute path="/create/product" exact component={CreateProduct}/>
        </Switch>
    </Router>
);

export default Routes;