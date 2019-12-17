import React, {useState, useEffect} from "react";
import Layout from "../Core/Layout";
import { isAuth } from '../Auth'
import { createProduct, getCategories }  from './ApiAdmin';

const CreateProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        error: null,
        loading: false,
        createdProduct: null,
        redirectToProfile: false,
        formData: null
    });

    const {name, description, price, category, categories, shipping, quantity, loading, error, createdProduct, redirectToProfile, formData} = values;

    const { user, token } = isAuth();

    // Load Categories
    const init = () => {
        getCategories().then(data => {
            if(data.err) {
                setValues({...values, error: data.err})
            } else {
                setValues({...values, categories: data, formData: new FormData()});
            }
        })
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = e => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setValues({
            ...values, [e.target.name] : value
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        setValues({...values, error: null, loading: true});

        createProduct(user._id, token, formData)
            .then(data => {
                if(data.err) {
                    setValues({...values, error: data.err})
                } else {
                    setValues({
                        ...values,
                        name: null,
                        description:  null,
                        photo: null,
                        price: null,
                        quantity: null,
                        error: null,
                        loading: false,
                        createdProduct: data.name
                    })
                }
            })
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-outline-secondary">
                    <input type="file" name="photo" accept="image/*"/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" name="name" onChange={handleChange} value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea className="form-control" name="description" onChange={handleChange} value={description} />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" className="form-control" name="price" onChange={handleChange} value={price} />
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select className="form-control" name="category" onChange={handleChange} value={category} >
                    <option>Please Select</option>
                    {categories && categories.map((c, i) =>(
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" className="form-control" name="quantity" onChange={handleChange} value={quantity} />
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select className="form-control" name="shipping" onChange={handleChange} value={shipping} >
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: createdProduct ? '' : 'none'}}>
            {`${createdProduct} is created!`}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h3>Loading</h3></div>)
    );


    return (
        <Layout title="Add a new proudct" description={`Hello ${user.name}, ready to add a new product?`} className="container" >
            <div className="row">
                <div className="col-md-12">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
};

export default CreateProduct;