import React, {useState, Fragment} from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import {addItem, updateItem, removeItem} from "./cartHelpers";

const Card = ({product, singleProduct = false, cart = false, setRun = f => f, run = undefined}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    const showStock = quantity => (
        quantity > 0 ?
            <span className='badge badge-primary badge-pill'>In stock</span>
            :
            <span  className='badge badge-primary badge-pill'>Out stock</span>
    );

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if(redirect) return <Redirect to='/cart' />
    };

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const productCard = () => (
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="product" />
                    {product.description.substring(0, 100)}
                    <p>$ {product.price}</p>
                    <p>Added on {moment(product.createdAt).fromNow()}</p>
                    <p>{showStock(product.quantity)}</p>
                    <Link to={`/product/${product._id}`}>
                        <button className="btn btn-outline-primary mt-2 mb-2">
                            View Product
                        </button>
                    </Link>
                    <button onClick={addToCart} className="btn btn-outline-warning-mt-2 mb-2">
                        Add to card
                    </button>
                </div>
            </div>
        </div>
    );

    const productSingle = () => (
        <div className='row'>
            <div className="col-md-6">
                <ShowImage item={product} url="product" />
            </div>
            <div className="col-md-6">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p style={{fontSize: '25px'}}>Price: {product.price}$</p>
                <p>{showStock(product.quantity)}</p>
                <p>Added on {moment(product.createdAt).fromNow()}</p>
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 col-md-12">
                    Add to card
                </button>
            </div>
        </div>
    );

    const productInCart = () => (
        <div className='row'>
            <div className="col-md-3">
                <ShowImage item={product} url="product" />
            </div>
            <div className="col-md-9">
                <h5>{product.name}</h5>
                <p style={{fontSize: '15px'}}>Price: {product.price}$</p>
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust quantity</span>
                        </div>
                        <input
                            type="number"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>

                </div>
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 col-md-6">
                        View Product
                    </button>
                </Link>
                <button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-outline-danger mt-2 mb-2 col-md-6"
                >
                    Delete product
                </button>
            </div>
        </div>
    );

    return (
        <Fragment>
            {shouldRedirect(redirect)}
            {cart ? productInCart() : singleProduct ? productSingle() : productCard()}
        </Fragment>
    )
};

export default Card;