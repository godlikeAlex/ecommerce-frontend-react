import React, {useEffect, useState} from 'react';
import Layout from "./Layout";
import {read, listRelatedProducts} from "./ApiCore";
import Card from "./Card";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.err) setError(data.err);
            else {
                setProduct(data);
                listRelatedProducts(productId).then(data => {
                    if(data.err) setError(data.err)
                    else setRelatedProducts(data);
                })
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

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
                <div className='row'>
                    <h1 className='mt-3 col-md-12'>Related products</h1>
                    {relatedProducts.map(product => (
                        <Card product={product} />
                    ))}
                </div>
            </Layout>
        </div>
    )
};

export default Product;