import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';  // Import Routes from react-router-dom
import Layout from '../struct/layout/layout';
import '../App.css';

const RoleBasedRouter = ({ routes, isAuthenticated }) => {
    const userRole = useSelector((state) => {
        return 'learner'; // Replace with state.auth.role;
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
                return (
                    // Wrap the Route components in a Routes component
                    <Routes key={route.path}>
                        <Route
                            path={route.path}
                            element={
                                <Layout
                                    key={route.key}
                                    className={`${route.path.substring(1)}`}
                                    pageName={route.pageName}
                                >
                                    <Component />
                                </Layout>
                            }
                        />
                    </Routes>
                );
            }
            return null;
        });
    };

    return (
        <div className='sub-app'>
            {isAuthenticated && renderRoutes()}
        </div>
    );
};

export default RoleBasedRouter;
