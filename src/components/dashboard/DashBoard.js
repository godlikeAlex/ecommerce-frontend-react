import React, {useEffect, useState} from "react";
import Layout from "../Core/Layout";
import {isAuth} from '../Auth'
import {Link} from "react-router-dom";
import {getPurchaseHistory} from '../user/apiUser';
import moment from "moment";


const DashBoard = () => {
    const [history, setHistory] = useState([]);

    const {user: {_id, name, email, role}, token} = isAuth();

    const init = () => {
        getPurchaseHistory(_id, token).then(data => {
            if(data.err) {
                console.log(data.err);
            } else {
                setHistory(data);
            }
        })
    };

    useEffect(() => {
        init();
    }, []);

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>Product price: ${p.price}</h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

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

    return (
        <Layout title="Dashboard" description={`Hello ${name}`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    );
};

export default DashBoard;