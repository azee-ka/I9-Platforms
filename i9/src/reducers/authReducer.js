// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import API_BASE_URL from '../config';
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
  token: null, // Add this line
};

const authActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      const { user, token } = action.payload;
      return { ...state, isAuthenticated: true, user: user, token: token };    
    case authActionTypes.LOGOUT:
      return { ...initialAuthState };
    default:
      return state;
  }
};




const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const storedAuthStateString = localStorage.getItem('authState');

    try {
      const storedAuthState = JSON.parse(storedAuthStateString);

      if (storedAuthState && storedAuthState.token) {
        authDispatch({
          type: authActionTypes.LOGIN,
          payload: { user: storedAuthState.user, token: storedAuthState.token },
        });
      }
    } catch (error) {
      console.error('Error parsing stored auth state:', error);
    }
  }, []);

  // Update localStorage whenever authState changes
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  // Log Redux state whenever it changes
  useEffect(() => {
    console.log('Redux State:', authState);
  }, [authState]);

  const login = (responseData) => {
    console.log('Login Function Payload:', responseData);
    authDispatch({
      type: authActionTypes.LOGIN,
      payload: {
        user: responseData.user,
        isAuthenticated: (responseData.message === "Login successful." || responseData.message === "User registered successfully."),
        token: responseData.token,
      },
    });
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

export { authReducer, AuthProvider, useAuthContext };
