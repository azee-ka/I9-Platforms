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
const LearnerProfile = React.lazy(() => import('../components/learner/learnerProfile/learnerProfile'));


const EducatorDashboard = React.lazy(() => import('../components/educator/educatorDashbord/educatorDashboard'));


const roleBasedRoutes = [
    { name: 'Learner Dashboard', path: '/learner/dashboard', role: 'Learner', component: LearnerDashboard, key: 'LearnerDashboard', showSidebar: true },
    { name: 'Learner Profile', path: '/learner/profile', role: 'Learner', component: LearnerProfile, key: 'LearnerPrfile', showSidebar: true },


    { name: 'Educator Dashboard', path: '/educator/dashboard', role: 'Educator', component: EducatorDashboard, key: 'EducatorDashboard', showSidebar: true },
    
    
    { name: 'Calculator', path: '/calculator', role: 'any', component: Calculator, key: 'Calculator', showSidebar: true },
    { name: 'Calculator', path: '/calculator/:expression', role: 'any', component: Calculator, key: 'Calculator-expression', showSidebar: true },
];


const publicRoutes = [
    { name: 'Access', path: '/', component: <Access />, key: 'Access', showSidebar: false },
    { name: 'Access', path: '/access', component: <Access />, key: 'Access-1', showSidebar: false },
    { name: 'Login', path: '/access/login', component: <LoginPage />, key: 'Login', showSidebar: false },
    { name: 'Register', path: '/access/register', component: <RegisterPage />, key: 'Register', showSidebar: false },

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
                                showSidebar={route.showSidebar}
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
                    {
                    <Route
                      path="/*"
                      element={<Navigate to={'/access/login'} />}
                  />  
                    }
                </Routes>
            </React.Suspense>
        </Router>
    );
};

export default AppRouter;
