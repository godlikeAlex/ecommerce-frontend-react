import React from 'react';
import Layout from '../Core/Layout';
import {API}  from '../../config';


const SignUp = () => (
    <Layout title="SignUp Page" description="Node React Ecomerce application">
    {process.env.REACT_API_URL}
    </Layout>
)

export default SignUp;