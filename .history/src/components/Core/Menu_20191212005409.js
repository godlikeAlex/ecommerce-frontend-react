import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => history.location.pathname === path ? 'active' : '';

const Menu = ({history}) => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="nav-item nav-link" to="/">Ecommerce</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link className="nav-item nav-link {isActive(history, '/')}" to="/">Home <span class="sr-only">(current)</span></Link>
                    <Link className="nav-item nav-link {isActive(history, '/signin')}" to="/signin">Signin</Link>
                    <Link className="nav-item nav-link {isActive(history, '/signup')}" to="/signup">Signup</Link>
                </div>
            </div>
        </nav>
    )
};

export default withRouter(Menu);