import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {isAuth, signOut} from '../Auth';

const isActive = (history, path) => {
    const defaultClasses = 'nav-item nav-link';
    return history.location.pathname === path ? `${defaultClasses} active` : defaultClasses;
};

const Menu = ({history}) => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="nav-item nav-link" to="/">Ecommerce</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link className={isActive(history, '/')} to="/">Home <span class="sr-only">(current)</span></Link>
                    <Link className={isActive(history, '/dashboard')} to="/dashboard">Dashboard <span class="sr-only">(current)</span></Link>

                    {!isAuth() && (
                        <Fragment>
                            <Link className={isActive(history, '/signin')} to="/signin">Signin</Link>
                            <Link className={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </Fragment>
                    )}
                    {isAuth() && (
                        <span className="nav-item nav-link"  onClick={() => signOut(() => history.push('/'))}>Sign out</span>
                    )}
                </div>
            </div>
        </nav>
    )
};

export default withRouter(Menu);