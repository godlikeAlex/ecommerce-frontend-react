import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getCategories, getFilteredProducts} from './ApiCore';
import CheckBox from "./CheckBox";
import {prices} from './fixedPrice';
import RadioBox from "./RadioBox";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

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
        loadFiltersResult(skip, limit, myFilters.filters);
    }, []);

    const loadFiltersResult = filters => {
        getFilteredProducts(skip, limit, filters).then(data => {
            if(data.err) setError(data.err);
            else setFilteredResults(data);
        })
    };

    const handleFilters = (filters, filterBy = 'category') => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy === 'price') {
            const {array: rangePrice} = prices.find(price => price.id === parseInt(filters));
            newFilters.filters[filterBy] = rangePrice;
        }
        setMyFilters(newFilters);
        loadFiltersResult(myFilters.filters);
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

                        <h4>Filter by price range</h4>
                        <ul>
                            <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                        </ul>
                    </div>

                    <div className="col-8">
                        {JSON.stringify(filteredResults)}
                    </div>
                </div>
            </Layout>
        </div>
    )
};

export default Shop;