import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './ApiCore';

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
            <Layout title="Home Page" description="Node React Ecomerce application">
                {JSON.stringify(productByArrival)}
                <hr />
                {JSON.stringify(productsBySell)}
            </Layout>
        </div>
    )
};

export default MainPage;