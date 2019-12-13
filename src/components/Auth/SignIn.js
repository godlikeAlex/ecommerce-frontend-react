import React, {useState} from 'react';
import Layout from '../Core/Layout';
import {API}  from '../../config';
import { Redirect } from "react-router-dom";

const SignUp = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, error, loading, redirectToReferrer} = values;

    const handleChange = e => {
        setValues({...values, error: false, [e.target.name]: e.target.value});
    };

    const authenticate = (data, cb) => {
        if(typeof window != 'undefined') {
            localStorage.setItem('jwt', JSON.stringify(data));
        }
        cb();
    };

    const signIn = (user) => {
        return fetch(`${API}/signin`, {
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
        setValues({...values, error: false, loading: true});
        signIn({email: email, password: password})
            .then(data => {
                if(data.err) setValues({...values, error: data.err, loading: false});
                else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                    });
                }
            })
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h3>Loading</h3></div>)
    );

    const redirectUser = () => {
        if(redirectToReferrer) {
            return <Redirect to="/" />
        }
    };

    return (
        <Layout title="Login Page" description="Node React Ecomerce application" className="container">
            {showError()}
            {showLoading()}
            {redirectUser()}
            <form action="">
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