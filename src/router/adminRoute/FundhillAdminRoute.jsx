import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { Organisation } from '../../pages/fundhill_admin';

const FundhillAdminRoute = () => {
    return (
        <Route path='admin' element={<Layout />}>
            <Route path='fundhill/organisation' element={<Organisation />} />
        </Route>
    )
}

export default FundhillAdminRoute