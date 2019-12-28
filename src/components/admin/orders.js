import React, {useState, useEffect} from "react";
import Layout from "../Core/Layout";
import { isAuth } from '../Auth'
import { listOrders }  from './ApiAdmin';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const {user, token} = isAuth();

    const loadOrders = () => {
        listOrders(user._id, token)
            .then(data => {
                if(data.err) {
                    console.log(data.err);
                } else {
                    setOrders(data);
                }
            })
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const noOrders = orders => {
        return orders.length < 1 ? <h4>No orders</h4> : null;
    };

    return (
        <Layout title="Orders" description={`Hello, you can manage all the orders here`} className="container" >
            <div className="row">
                <div className="col-md-12">
                    {noOrders(orders)}
                    {JSON.stringify(orders)}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;