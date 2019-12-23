import React, {useState, useEffect} from 'react';
import {isAuth} from "../Auth";
import {Link} from "react-router-dom";

const CheckOut = ({products}) => {

    const getTotal = () => {
        return products.reduce( (currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    return (
        <div>
            <h3>Total: {getTotal()} $</h3>
            {isAuth() ? (
                <button className="btn btn-success">Checkout</button>
            ) : (
                <Link to='/signin'>
                    <button className="btn btn-primary">Sign in to checkout</button>
                </Link>
            )}
        </div>
    )
};

export default CheckOut;