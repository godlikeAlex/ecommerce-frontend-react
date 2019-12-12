import React from 'react';
import Layout from '../Core/Layout';
import {API}  from '../../config';


const SignUp = () => (
    <Layout title="Signin Page" description="Node React Ecomerce application">
    {process.env.API_URL}
    </Layout>
)

export default SignUp;