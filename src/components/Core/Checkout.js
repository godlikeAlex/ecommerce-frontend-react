import React, {useState, useEffect} from 'react';
import {isAuth} from "../Auth";
import {Link} from "react-router-dom";
import {getBrainTreeToken, processPayment, createOrder} from './ApiCore';
import DropIn from 'braintree-web-drop-in-react';
import {emptyCart} from "./cartHelpers";

const CheckOut = ({products, setRun = f => f, run = undefined}) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: null,
        instance: {},
        address: ''
    });

    const userId = isAuth() && isAuth().user._id;
    const token = isAuth() && isAuth().token;

    const getToken = (userId, token) => {
        getBrainTreeToken(userId, token).then(data => {
            if(data.err) setData({...data, error: data.err});
            else setData({clientToken: data.clientToken})
        })
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const getTotal = () => {
        return products.reduce( (currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const handleAddress = e => {
        setData({...data, address: e.target.value});
    };

    const deliveryAddress = data.address;

    const buy = () => {
        let nonce;
        let getInstance = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce;
                // console.log('send nonce and total to process:', nonce, getTotal(products));
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        const createOrderData = {
                            products,
                            transactionId: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };
                        createOrder(userId, token, createOrderData)
                            .then(() => {
                                setData({...data, success: response.success});
                                emptyCart(() => {
                                    setRun(!run);
                                    console.log('Payment Success');
                                })
                            })
                            .catch(err => setData({...data, error: err}));
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => {
                // console.log('dropin error', err);
                setData({...data, error: err});
            })
    };

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: null})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            cols="30"
                            rows="10"
                            className="form-control"
                            onChange={handleAddress}
                            value={data.address}
                            placeholder='Type your delivery address here...'
                        />
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: 'vault'
                        }
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success">Checkout</button>
                </div>
            ) : null}
        </div>
    );
    
    const showError = (error) => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>Whoops error.</div>
    );

    const showSuccess = (success) => (
        <div className='alert alert-success' style={{display: success ? '' : 'none'}}>
            Thanks! Your payment was successful
        </div>
    );

    return (
        <div>
            <h3>Total: {getTotal()} $</h3>
            {showSuccess(data.success)}
            {showError(data.error)}
            {isAuth() ? (
                <div>{showDropIn()}</div>
            ) : (
                <Link to='/signin'>
                    <button className="btn btn-primary">Sign in to checkout</button>
                </Link>
            )}
        </div>
    )
};

export default CheckOut;