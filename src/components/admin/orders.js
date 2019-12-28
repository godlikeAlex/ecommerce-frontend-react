import React, {useState, useEffect} from "react";
import Layout from "../Core/Layout";
import { isAuth } from '../Auth'
import { listOrders }  from './ApiAdmin';
import moment from "moment";

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

    const showOrdersLength = () => {
        if(orders.length > 0) {
            return (
                <h3 className='text-danger display-2'>Total orders: {orders.length}</h3>
            )
        } else {
            return  (
                <h3 className="text-danger">No orders.</h3>
            )
        }
    };

    const showInput = (key, value) => (
        <div className='input-group mb-2 mr-sm-2'>
            <div className="input-group-prepend">
                <div className='input-group-text'>{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className='form-control'
                readOnly
            />
        </div>
    );

    const renderOrders = () => (
        orders.map((order, i) => (
            <div className="mt-5" key={i} style={{borderBottom: '5px solid indigo'}}>
                <h2 className='mb-5'>
                    <span className="bg-primary">Order ID: {order._id}</span>
                </h2>

                <ul className='list-group mb-2'>
                    <li className="list-group-item">
                        {order.status}
                    </li>
                    <li className="list-group-item">
                        Transaction ID: {order.transaction_id}
                    </li>
                    <li className="list-group-item">
                        Amount: {order.amount} $
                    </li>
                    <li className="list-group-item">
                        Ordered by: {order.user.name}
                    </li>
                    <li className="list-group-item">
                        Ordered on: {moment(order.createdAt).fromNow()}
                    </li>
                    <li className="list-group-item">
                        Address: {order.address}
                    </li>
                </ul>

                <h4 className='mt-5 mb-4 font-italic'>
                    Total Products in the order: {order.products.length}
                </h4>

                {order.products.map((p, pIndex) => (
                    <div className='mb-4' key={pIndex} style={{padding: '20px', border: '1px solid indigo'}}>
                        {showInput('Product name', p.name)}
                        {showInput('Product price', p.price)}
                        {showInput('Product total', p.count)}
                        {showInput('Product Id', p._id)}
                    </div>
                ))}
            </div>
        ))
    );

    return (
        <Layout title="Orders" description={`Hello, you can manage all the orders here`} className="container" >
            <div className="row">
                <div className="col-md-12">
                    {showOrdersLength()}

                    {renderOrders()}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;