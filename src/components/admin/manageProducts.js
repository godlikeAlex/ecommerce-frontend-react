import React, {useEffect, useState} from "react";
import Layout from "../Core/Layout";
import { isAuth } from '../Auth'
import Card from "../Core/Card";
import {getProducts, deleteProduct} from './ApiAdmin';
import {Link} from "react-router-dom";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.err) {
                console.log(data.err);
            } else {
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const {user, token} = isAuth();

    const removeProduct = productId => {
        deleteProduct(productId, user._id, token)
            .then(data => {
                if(data.err) {
                    console.log(data.err);
                } else {
                    loadProducts();
                }
            })
    };

    return (
        <div>
            <Layout title="Manage Products" className="container" description="Perform CRUD on products">
                <div className="row">
                    <div className='col-12'>
                        <ul className="list-group">
                            {products.map((product, i) => (
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <strong>{product.name}</strong>
                                    <Link to={`admin/product/update/${product._id}`}>
                                        <span className="badge badge-warning badge-pill">Update product</span>
                                    </Link>
                                    <span className="badge badge-danger badge-pill" onClick={() => removeProduct(product._id)}>Delete product</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    )
};

export default ManageProducts;