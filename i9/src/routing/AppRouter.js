// AppRouter.js
import React, { useEffect } from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useAuthContext } from '../reducers/authReducer';
import RoleBasedRouter from './RoleBasedRouter';
import LoginPage from '../access/login/login';
import RegisterPage from '../access/register/register';
import Access from '../access/access';
import Layout from '../struct/layout/layout';
import { useAuth } from '../reducers/auth/useAuth';


const Calculator = React.lazy(() => import('../components/tools/calculator/calculator'));
const LearnerDashboard = React.lazy(() => import('../components/learner/learnerDashboard/learnerDashboard'));
const EducatorDashboard = React.lazy(() => import('../components/educator/educatorDashbord/educatorDashboard'));

const roleBasedRoutes = [
    { name: 'Learner Dashboard', path: '/learner/dashboard', role: 'learner', component: LearnerDashboard, key: 'LearnerDashboard' },
    { name: 'Educator Dashboard', path: '/educator/dashboard', role: 'educator', component: EducatorDashboard, key: 'EducatorDashboard' },
    { name: 'Calculator', path: '/calculator', role: 'any', component: Calculator, key: 'Calculator' },
    { name: 'Calculator', path: '/calculator/:expression', role: 'any', component: Calculator, key: 'Calculator-expression' },
];


const publicRoutes = [
    { name: 'Access', path: '/', component: <Access />, key: 'Access' },
    { name: 'Access', path: '/access', component: <Access />, key: 'Access-1' },
    { name: 'Login', path: '/access/login', component: <LoginPage />, key: 'Login' },
    { name: 'Register', path: '/access/register', component: <RegisterPage />, key: 'Register' },

];

const AppRouter = () => {
    const { authState, isLoading } = useAuth();

    const isAuthenticated = authState.isAuthenticated;
    
    useEffect(() => {
        console.log(authState);
    }, [authState.isAuthenticated]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {!isAuthenticated && publicRoutes.map((route) => (
                        <Route key={route.key} path={route.path} element={
                            <Layout
                                key={route.key}
                                className={`${route.path.substring(1)}`}
                                pageName={route.pageName}
                            >
                                {route.component}
                            </Layout>
                        } />
                    ))}

                    {isAuthenticated &&
                    <Route
                        path="/*"
                        element={<RoleBasedRouter routes={roleBasedRoutes} isAuthenticated={isAuthenticated} />}
                    />
                    }
                </Routes>
            </React.Suspense>
        </Router>
    );
};

export default AppRouter;
