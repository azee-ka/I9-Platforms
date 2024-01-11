// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuthContext } from './utils/context/authentication';

function PrivateRoute({ element, ...rest }) {
  const { authState } = useAuthContext();

  console.log(authState.isAuthenticated);

  return authState.isAuthenticated !== false ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/access/login" replace />
  );
}

export default PrivateRoute;
