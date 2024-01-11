import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '../App.css';
import PrivateRoute from '../PrivateRoute';
import ErrorBoundary from '../ErrorBoundary';
import { useAuthContext } from '../utils/context/authentication';
import Layout from '../struct/layout/layout';

import Access from '../access/access';
import RegisterForm from '../access/register/register';
import LoginForm from '../access/login/login';

import Calculator from '../app/tools/calculator/calculator';
import LearnerDashboard from '../app/learner/dashboardLearner/learnerDashboard';


function AppContent() {
    const { authState } = useAuthContext();
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        // Check if authentication state is ready
        setIsAuthReady(true);
    }, [authState]);

    const publicRoutes = [
        {
            name: 'Access',
            path: '/',
            element: (<Access />),
            key: 'Access',
        },
        {
            name: 'Access',
            path: '/access',
            element: (<Access />),
            key: 'Access-1',
        },
        {
            name: 'Login',
            path: '/access/login',
            element: (<LoginForm />),
            key: 'Login',
        },
        {
            name: 'Register',
            path: '/access/register',
            element: (<RegisterForm />),
            key: 'Register',
        },
    ]

    const privateRoutes = [
        {
            name: 'Calculator',
            path: '/',
            element: <Calculator />,
            key: 'Home',
        },
        {
            name: 'Calculator',
            path: '/calculator',
            element: <Calculator />,
            key: 'Calculator',
        },
        {
            name: 'Calculator',
            path: '/calculator/:expression',
            element: <Calculator />,
            key: 'Calculator-expression',
        },
        {
            name: 'Learner Dashboard',
            path: '/learner/dashboard',
            element: <LearnerDashboard />,
            key: 'LearnerDashboard',
        }
    ]

    const routes = authState.isAuthenticated ? privateRoutes : publicRoutes;

    return (
        <ErrorBoundary>
            <div className='App'>
                <Router>
                    {isAuthReady && !authState.isAuthenticated && privateRoutes.find(route => (route.path === window.location.pathname)) !== undefined && (
                        <Navigate to={"/access/login"}  />
                    )}
                    <Routes>
                        {routes.map(({ path, element, pageName, key }) => (
                            <Route
                                key={key}
                                path={path}
                                element={
                                    <Layout
                                        key={key}
                                        className={`${path.substring(1)}`}
                                        pageName={pageName}
                                    >
                                        {element}
                                    </Layout>
                                }
                            />
                        ))}
                    </Routes>
                </Router>

            </div>
        </ErrorBoundary>

    );
}

export default AppContent;
