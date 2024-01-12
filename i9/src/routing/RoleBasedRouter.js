// RoleBasedRouter.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';
import Layout from '../struct/layout/layout';

const RoleBasedRouter = ({ routes, isAuthenticated }) => {
    const userRole = useSelector((state) => {
        console.log('User Role:', state.auth.role);
        return 'learner'; // state.auth.role;
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/access/login');
        }
    }, [isAuthenticated, navigate]);

    const renderRoutes = () => {
        return routes.map((route) => {
            if (route.role === userRole || route.role === 'any') {
                const Component = route.component; // Get component reference
                return <Route key={route.path} path={route.path} element={
                    <Layout
                        key={route.key}
                        className={`${route.path.substring(1)}`}
                        pageName={route.pageName}
                    >
                        <Component /> {/* Render the component */}
                    </Layout>
                } />;
            }
            return null;
        });
    };

    return <div>{isAuthenticated && renderRoutes()}</div>;
};

export default RoleBasedRouter;
