import React, {useState} from "react";
import Layout from "../Core/Layout";
import { isAuth } from '../Auth'
import {createCategory} from './ApiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuth();

    const handleChange = e => {
        setError(false);
        setSuccess(false);
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        createCategory(user._id, token, {name})
            .then(response => {
                if(response.err) {
                    setError(true);
                } else {
                    setError(false);
                    setSuccess(true);
                }
            })

    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showError = () => {
        if(error) {
            return (
                <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                    Category should be unique!
                </div>
            )
        }
    };

    const showSuccess = () => {
        if (success) {
            return (
                <div className="alert alert-info">
                    {name} is created!
                </div>
            )
        }
    };

    return (
        <Layout title="Create category" description={`Hello ${name}, ready to add a new category?`} className="container" >
            <div className="row">
                <div className="col-md-12">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;

