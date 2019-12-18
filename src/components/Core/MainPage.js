import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './ApiCore';
import Card from './Card';

const MainPage = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.err) {
                setError(data.err);
            } else {
                setProductsBySell(data);
            }
        })
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.err) {
                setError(data.err);
            } else {
                setProductByArrival(data);
            }
        })
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <div>
            <Layout title="Home Page" className="container" description="Node React Ecomerce application">
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                    {productByArrival.map(product => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>

                <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
                    {productsBySell.map(product => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            </Layout>
        </div>
    )
};

export default MainPage;