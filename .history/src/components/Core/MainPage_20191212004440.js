import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Menu from './Menu';

const MainPage = () => {
    return (
        <div>
            <Menu />
            <div>Home</div>
        </div>
    )
};

export default MainPage;