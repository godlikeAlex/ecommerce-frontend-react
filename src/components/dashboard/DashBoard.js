import React from "react";
import Layout from "../Core/Layout";
import {isAuth} from '../Auth'
import {Link} from "react-router-dom";

const DashBoard = () => {
    const {user: {_id, name, email, role}} = isAuth();

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart" >My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`} >Profile update</Link>
                    </li>
                </ul>
            </div>
        )
    };

    const userInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 0 ? 'Subscriber' : 'Admin'}</li>
            </ul>
        </div>
    );

    const purchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">History #1</li>
            </ul>
        </div>
    );

    return (
        <Layout title="Dashboard" description={`Hello ${name}`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </Layout>
    );
};

export default DashBoard;