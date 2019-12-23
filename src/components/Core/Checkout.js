import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getCart} from "./cartHelpers";
import Card from "./Card";

const CheckOut = ({products}) => {

    const getTotal = () => {
        products.reduce( (currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    return (
        <h3>Total: {getTotal()}</h3>
    )
};

export default CheckOut;