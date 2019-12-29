import React, {useState, useEffect} from "react";
import Layout from "../Core/Layout";
import {isAuth} from "../Auth";
import {read, update, updateUser} from './apiUser';
import {Redirect} from 'react-router-dom';

const Profile = (props) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const {name, email, password, error, success} = values;
    const {token} = isAuth();

    const init = userId => {
        read(userId, token).then(data => {
            if(data.err) {
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email});
            }
        })
    };

    useEffect(() => {
        init(props.match.params.userId);
    }, []);

    const handleChange = e => {
        const {name: tName, value: tValue} = e.target;
        setValues({...values, error: false, [tName]: tValue});
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(props.match.params.userId, token, {name, email, password}).then(data => {
            if(data.err) {
                console.log(data.err);
            } else {
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true})
                });
            }
        })
    };

    const redirectUser = () => {
        if (success) {
            return (<Redirect to='/cart' />)
        }
    };

    const profileUpdate = (name, email) => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange} name='name' className='form-control' value={name}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange} name='email' className='form-control' value={email}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange} name='password' className='form-control' value={password}/>
            </div>

            <button className="btn btn-primary">Submit</button>
        </form>
    );

    return (
        <Layout
            title='Profile'
            description='Update your profile'
            className='container'
        >
            {redirectUser()}
            {profileUpdate(name, email, password)}
        </Layout>
    )

};

export default Profile;