import React, {useEffect, useState} from 'react';
import Layout from "./Layout";
import {read} from "./ApiCore";
import Card from "./Card";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.err) setError(data.err);
            else setProduct(data);
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, []);

    return (
        <div>
            <Layout
                title={product && product.name}
                className="container"
                description={product && product.description && product.description.substring(0, 100)}
            >
                <div>
                    <Card product={product} singleProduct={true} />
                </div>
            </Layout>
        </div>
    )
};

export default Product;