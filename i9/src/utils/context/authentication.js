// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import API_BASE_URL from '../../config';
import axios from 'axios'; // Import axios


const initialAuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  },
};

const authActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      const { user, token } = action.payload;
      return { ...state, isAuthenticated: true, user: user, token: token }; // Include token in authState
    case authActionTypes.LOGOUT:
      return { ...initialAuthState };
    default:
      return state;
  }
};


const AuthContext = createContext();

const AuthProvider = ({ children }) => {


  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  const [isAuthenticated, setIsAuthenticated] = useState((JSON.parse(localStorage.getItem('authState'))) !== null ? JSON.parse(localStorage.getItem('authState')).token !== null : false);

  // Load authentication state from localStorage on component mount
  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const storedAuthStateString = localStorage.getItem('authState');

    try {
      const storedAuthState = JSON.parse(storedAuthStateString);

      // Check if a valid token is present
      setIsAuthenticated((prevIsAuthenticated) => {
        return storedAuthState && storedAuthState.token !== null && storedAuthState.token !== undefined;
      });

      if (storedAuthState && storedAuthState.token) {
        authDispatch({
          type: authActionTypes.LOGIN,
          payload: { user: storedAuthState.user, token: storedAuthState.token },
        });
      }
    } catch (error) {
      console.error('Error parsing stored auth state:', error);
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]);  // Ensure that the callback dependency is correct

  // Update localStorage whenever authState changes
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);


  const login = (responseData) => {
    authDispatch({
      type: authActionTypes.LOGIN,
      payload: {
        user: responseData.user,
        isAuthenticated: (responseData.message === "Login successful." || responseData.message === "User registered successfully.") ? true : false,
        token: responseData.token,
      }
    });
  }

  const getUserInfo = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}user/get-user-info/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${credentials.token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        authDispatch({ type: authActionTypes.LOGIN, payload: { user: userData, token: credentials.token } });
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const logout = () => {
    authDispatch({ type: authActionTypes.LOGOUT });
    window.location.href = '/access/login';
  };


  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext };
