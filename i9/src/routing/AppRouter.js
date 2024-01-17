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
const LearnerSettings = React.lazy(() => import('../components/learner/learnerSettings/learnerSettings'));
const LearnerMessages = React.lazy(() => import('../components/learner/learnerMessages/learnerMessages'));

const PersonalDashboard = React.lazy(() => import('../components/personal/personalTimeline/personalTimeline'));
const PersonalProfile = React.lazy(() => import('../components/personal/personalProfile/personalProfile'));
const PersonalSettings = React.lazy(() => import('../components/personal/personalSettings/personalSettings'));
const PersonalMessages = React.lazy(() => import('../components/personal/personalMessages/personalMessages'));
const CreatePost = React.lazy(() => import('../components/personal/createPost/createPost'));
const ExpandedPost = React.lazy(() => import('../components/personal/expandPost/expandedPost'));

const EducatorDashboard = React.lazy(() => import('../components/educator/educatorDashbord/educatorDashboard'));


const roleBasedRoutes = [
    // Learner Pages
    { name: 'Learner Dashboard', path: '/', role: 'Learner', component: LearnerDashboard, key: 'LearnerDashboard', showSidebar: true },
    { name: 'Learner Dashboard', path: '/learner/dashboard', role: 'Learner', component: LearnerDashboard, key: 'LearnerDashboard', showSidebar: true },
    { name: 'Learner Profile', path: '/learner/profile', role: 'Learner', component: LearnerProfile, key: 'LearnerProfile', showSidebar: true },
    { name: 'Learner Preferences', path: '/learner/preferences', role: 'Learner', component: LearnerSettings, key: 'LearnerPreferences', showSidebar: true },
    { name: 'Learner Messages', path: '/learner/messages', role: 'Learner', component: LearnerMessages, key: 'LearnerMessages', showSidebar: true },

    // Personal Pages
    { name: 'Personal Dashboard', path: '/', role: 'Personal', component: PersonalDashboard, key: 'PersonalDashboard', showSidebar: true },
    { name: 'Personal Dashboard', path: '/personal/dashboard', role: 'Personal', component: PersonalDashboard, key: 'PersonalDashboard', showSidebar: true },
    { name: 'Personal Profile', path: '/personal/profile', role: 'Personal', component: PersonalProfile, key: 'PersonalProfile', showSidebar: true },
    { name: 'Personal Profile', path: '/personal/profile#:overlay', role: 'Personal', component: PersonalProfile, key: 'PersonalProfile', showSidebar: true },
    { name: 'Personal Preferences', path: '/personal/preferences', role: 'Personal', component: PersonalSettings, key: 'PersonalPreferences', showSidebar: true },
    { name: 'Personal Messages', path: '/personal/messages', role: 'Personal', component: PersonalMessages, key: 'PersonalMessages', showSidebar: true },
    { name: 'Personal Create Post', path: '/personal/create-post', role: 'Personal', component: CreatePost, key: 'PersonalCreatePost', showSidebar: true },
    { name: 'Personal Post', path: '/personal/post/:postId', role: 'Personal', component: ExpandedPost, key: 'PersonalPost', showSidebar: false },


    // Educator Pages
    { name: 'Educator Dashboard', path: '/educator/dashboard', role: 'Educator', component: EducatorDashboard, key: 'EducatorDashboard', showSidebar: true },
    
    // Any Role Pages
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
    
    // useEffect(() => {
    //     console.log(authState);
    // }, [authState.isAuthenticated]);


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
