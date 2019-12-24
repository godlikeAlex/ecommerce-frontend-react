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

    const showDropIn = () => (
        <div>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance => (data.instance = instance)} />
                    <button className="btn btn-success">Checkout</button>
                </div>
            ) : null}
        </div>
    );

    return (
        <div>
            <h3>Total: {getTotal()} $</h3>
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