// RoleBasedRouter.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';

const RoleBasedRouter = ({ routes, isAuthenticated }) => {
    const userRole = useSelector((state) => {
        console.log('User Role:', state.auth.role);
        return 'learner'//state.auth.role;
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
            console.log(routes)
            if (route.role === userRole || route.role === 'any') {
                return <Route key={route.path} path={route.path} element={
                // <React.Fragment>{component}</React.Fragment>
                route.component
            } />;
            }
            return null;
        });
    };

    return <div>{isAuthenticated && renderRoutes()}</div>;
};

export default RoleBasedRouter;
