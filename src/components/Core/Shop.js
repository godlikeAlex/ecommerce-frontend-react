import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getCategories, getFilteredProducts} from './ApiCore';
import CheckBox from "./CheckBox";
import {prices} from './fixedPrice';
import RadioBox from "./RadioBox";
import Card from "./Card";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
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
            else {
                setFilteredResults(data.products);
                setSize(data.size);
                setSkip(0);
            }
        })
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.err) setError(data.err);
            else {
                setFilteredResults([...filteredResults, ...data.products]);
                setSize(data.size);
                setSkip(toSkip);
            }
        })
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
            )
        )
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
                        <h2 className="mb-2">Products</h2>
                        <div className="row">
                            {filteredResults.map((product, i) => (
                                <Card key={i} product={product} />
                            ))}
                        </div>
                        <hr />
                        {loadMoreButton()}
                    </div>

                </div>
            </Layout>
        </div>
    )
};

export default Shop;