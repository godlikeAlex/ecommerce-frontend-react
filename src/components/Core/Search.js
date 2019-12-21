import React, {useState, useEffect} from 'react';
import { getCategories, list } from "./ApiCore";
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const {categories, category, search, results, searched} = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.err) {
                console.error(data.err)
            }
            else {
                setData({...data, categories: data});
            }
        })
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Found ${results.length} products`;
        }

        if(searched && results.length < 1) {
            return `No products found`;
        }

    };

    const searchedProducts = (products = []) => {
        return (
            <div>
                <h2 className='mt-4 mb-4'>
                    {searchMessage(searched, results)}
                </h2>
                <div className='row'>
                    {products.map(product => (
                        <Card product={product} key={product._id} />
                    ))}
                </div>
            </div>
        )
    };

    const searchData = () => {
        if(search) {
            list({search: search || undefined, category }).then(response => {
                if(response.err) {
                    console.error(response.err);
                } else {
                    setData({...data, results: response, searched: true});
                }
            })
        }
        console.log(search, category);
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = e => {
        const target = e.target;
        setData({...data, [target.name]: target.value, searched: false});
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange} name="category">
                            <option value="All">Pick category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange}
                        name="search"
                        value={search}
                        placeholder='Search By name'
                    />
                </div>
                <span className="btn input-group-append" style={{border: 'none'}}>
                    <button className="input-group-text">Search</button>
                </span>
            </span>
        </form>
    );

    return (
        <div>
            <div className="container">
                {searchForm()}
            </div>

            <div className="container-fluid mb-3 mt-3">
                {searchedProducts(results)}
            </div>
        </div>
    )
};

export default Search;