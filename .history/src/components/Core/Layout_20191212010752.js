import React from 'react';

const Layout = ({title = 'Title', description = 'Desc', className, children}) => (
    <div>
        <div className="jumbotron">
            <h2>Title</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>
            {children}
        </div>
    </div>
);

export default Layout;