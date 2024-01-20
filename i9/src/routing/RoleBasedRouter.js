import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Layout from '../struct/layout/layout';
import '../App.css';

const RoleBasedRouter = ({ routes, isAuthenticated }) => {
    const navigate = useNavigate();

    const userRole = useSelector((state) => {
        return state.auth.user.role;
    });

    const [expandPreviousPostIdReciever, setExpandPreviousPostIdReciever] = useState();
    const [expandPostIdReciever, setExpandPostIdReciever] = useState();
    const [expandNextPostIdReciever, setExpandNextPostIdReciever] = useState();

    const [expandPostOnCloseUrl, setExpandPostOnCloseUrl] = useState();

    const handleExpandPostOpen = (overlayPreviousPostId, postIdToExpand, overlayNextPostId, originalPreviousUrl) => {
        setExpandPreviousPostIdReciever(overlayPreviousPostId);
        setExpandPostIdReciever(postIdToExpand);
        setExpandNextPostIdReciever(overlayNextPostId);

        setExpandPostOnCloseUrl(originalPreviousUrl);
    }; 

    const handleExpandPostClose = () => {
        // e.stopPropagation();
        setExpandPreviousPostIdReciever(null);
        setExpandPostIdReciever(null);
        setExpandNextPostIdReciever(null);

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
                                    overlayNextPostId={expandNextPostIdReciever}
                                    overlayPreviousPostId={expandPreviousPostIdReciever}
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
