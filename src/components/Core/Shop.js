import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getCategories} from './ApiCore';
import CheckBox from "./CheckBox";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });
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

    const handleFilters = (filters, filterBy = 'category') => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters);
    };

    return (
        <div>
            <Layout title="Home Page" className="container" description="Shop">
                <div className="row">
                    <div className="col-4">
                        <h4>Filter by category</h4>
                        <ul>
                            <CheckBox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                        </ul>
                    </div>

                    <div className="col-8">
                        {JSON.stringify(myFilters)}
                    </div>
                </div>
            </Layout>
        </div>
    )
};

export default Shop;