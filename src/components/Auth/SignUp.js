import React, {useState} from 'react';
import Layout from '../Core/Layout';
import {Link} from "react-router-dom";
import {API} from '../../config';

const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, error, success} = values;

    const handleChange = e => {
        setValues({...values, error: false, [e.target.name]: e.target.value});
    };

    const createAccount = (user) => {
        return fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                return res.json()
            })
            .catch(err => console.error(err));
    };

    const clickSubmit = e => {
       e.preventDefault();
       setValues({...values, error: false});
       createAccount({name: name, email: email, password: password})
           .then(data => {
               if(data.err) setValues({...values, error: data.err, success: false});
               else {
                   setValues({
                       name: '',
                       email: '',
                       password: '',
                       error: '',
                       success: true
                   });
               }
           })
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New Account is created. Please <Link to="/signin">Signin</Link>!
        </div>
    );


    return (
        <Layout title="SignUp Page" description="Node React Ecomerce application" className="container">
            {showError()}
            {showSuccess()}
            <form action="">
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input name="name" value={name} onChange={handleChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input name="email" value={email} onChange={handleChange} type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input name="password" value={password} onChange={handleChange} type="password" className="form-control"/>
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">Create Account</button>
            </form>
        </Layout>
    )
};

export default SignUp;