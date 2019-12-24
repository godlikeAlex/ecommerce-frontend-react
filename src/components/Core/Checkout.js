import React, {useState, useEffect} from 'react';
import {isAuth} from "../Auth";
import {Link} from "react-router-dom";
import { getBrainTreeToken } from './ApiCore';
import DropIn from 'braintree-web-drop-in-react';

const CheckOut = ({products}) => {
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
            else setData({...data, clientToken: data.clientToken})
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

    const buy = () => {
        let nonce;
        let getInstance = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce;
                console.log('send nonce and total to process:', nonce, getTotal(products))
            })
            .catch(err => {
                console.log('dropin error', err);
                setData({...data, error: err});
            })
    };

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: null})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success">Checkout</button>
                </div>
            ) : null}
        </div>
    );
    
    const showError = (error) => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>Whoops error.</div>
    );

    return (
        <div>
            <h3>Total: {getTotal()} $</h3>
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