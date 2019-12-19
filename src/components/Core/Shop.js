import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getCategories} from './ApiCore';
import CheckBox from "./CheckBox";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    const init = () => {
        getCategories().then(data => {
            if(data.err) {
                setError('Whoops, Something went wrong 😔');
            } else {
                setCategories(data);
            }
        })
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div>
            <Layout title="Home Page" className="container" description="Shop">
                <div className="row">
                    <div className="col-4">
                        <h4>Filter by category</h4>
                        <ul>
                            <CheckBox categories={categories} />
                        </ul>
                    </div>

                    <div className="col-8">
                        Right
                    </div>
                </div>
            </Layout>
        </div>
    )
};

export default Shop;