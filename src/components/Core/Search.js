import React, {useState, useEffect} from 'react';
import { getCategories } from "./ApiCore";

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

    const searchSubmit = () => {

    };

    const handleChange = e => {

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
                        value='Search By  name'
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
        </div>
    )
};

export default Search;