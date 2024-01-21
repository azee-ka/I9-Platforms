import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Layout from '../struct/layout/layout';
import '../App.css';
import { useAuth } from '../reducers/auth/useAuth';

const RoleBasedRouter = ({ routes, isAuthenticated }) => {
    const navigate = useNavigate();

    const { authState } = useAuth();
    console.log(authState)
    const userRole = useSelector((state) => {
        return state.auth.user.role;
    });

    const [expandPostIdReciever, setExpandPostIdReciever] = useState();

    const [expandPostOnCloseUrl, setExpandPostOnCloseUrl] = useState();

    const handleExpandPostOpen = (postIdToExpand, originalPreviousUrl) => {
        setExpandPostIdReciever(postIdToExpand);

        setExpandPostOnCloseUrl(originalPreviousUrl);
    }; 

    const handleExpandPostClose = () => {
        // e.stopPropagation();
        setExpandPostIdReciever(null);

        navigate(expandPostOnCloseUrl);
    };

    const renderRoutes = () => {
        return routes.map((route) => {
            if (route.role === userRole || route.role === 'any') {
                const Component = route.component;
                return (
                    <Routes key={route.path}>
                        <Route
                            path={route.path}
                            element={
                                <Layout
                                    key={route.key}
                                    className={`${route.path.substring(1)}`}
                                    pageName={route.pageName}
                                    showSidebar={route.showSidebar}
                                    expandPostIdReciever={expandPostIdReciever}
                                    handleExpandPostClose={handleExpandPostClose}
                                >
                                    <Component handleExpandPostOpen={handleExpandPostOpen} />
                                </Layout>
                            }
                        />
                    </Routes>
                );
            } else {
                return null;
                // return( <Routes>
                //     <Route
                //         path="/*"
                //         element={<Navigate to={'/personal/dashboard'} />}
                //     />
                // </Routes>);
            }

        });
    };

    return (
        <div className='sub-app'>
            {isAuthenticated && renderRoutes()}

        </div>
    );
};

export default RoleBasedRouter;
