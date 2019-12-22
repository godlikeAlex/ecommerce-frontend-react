import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({product, singleProduct = false}) => {

    const showStock = quantity => (
        quantity > 0 ?
            <span className='badge badge-primary badge-pill'>In stock</span>
            :
            <span  className='badge badge-primary badge-pill'>Out stock</span>
    );

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
                    <button className="btn btn-outline-warning-mt-2 mb-2">
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
                <button className="btn btn-outline-warning mt-2 mb-2 col-md-12">
                    Add to card
                </button>
            </div>
        </div>
    );

    return (
        singleProduct ? productSingle() : productCard()
    )
};

export default Card;