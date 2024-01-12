// AppRouter.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../reducers/authReducer';
import RoleBasedRouter from './RoleBasedRouter';
import LoginPage from '../access/login/login';
import RegisterPage from '../access/register/register';
import Access from '../access/access';

import Calculator from '../components/tools/calculator/calculator';
import LearnerDashboard from '../components/learner/learnerDashboard/learnerDashboard';
import EducatorDashboard from '../components/educator/educatorDashbord/educatorDashboard';

// const Calculator = React.lazy(() => import('../components/tools/calculator/calculator'));
// const LearnerDashboard = React.lazy(() => import('../components/learner/learnerDashboard/learnerDashboard'));
// const EducatorDashboard = React.lazy(() => import('../components/educator/educatorDashbord/educatorDashboard'));

const roleBasedRoutes = [
  { path: '/learner/dashboard', role: 'learner', component: <LearnerDashboard />, key: 'LearnerDashboard' },
  { path: '/educator/dashboard', role: 'educator', component: <EducatorDashboard />, key: 'EducatorDashboard' },
  { path: '/calculator', role: 'any', component: <Calculator />, key: 'Calculator' },
  { path: '/calculator/:expression', role: 'any', component: <Calculator />, key: 'Calculator-expression' },
];

const publicRoutes = [
  { name: 'Access', path: '/', component: <Access />, key: 'Access' },
  { name: 'Access', path: '/access', component: <Access />, key: 'Access-1' },
  { name: 'Login', path: '/access/login', component: <LoginPage />, key: 'Login' },
  { name: 'Register', path: '/access/register', component: <RegisterPage />, key: 'Register' },

];

const AppRouter = () => {
  const { authState } = useAuthContext();
  const isAuthenticated = authState.isAuthenticated;

  useEffect(() => {
    console.log('Redux State on Mount:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
        {!isAuthenticated && publicRoutes.map((route) => (
            <Route key={route.key} path={route.path} element={route.component} />
          ))}
          <Route path="/" element={<React.Fragment><RoleBasedRouter routes={roleBasedRoutes} isAuthenticated={isAuthenticated} /></React.Fragment>} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default AppRouter;
