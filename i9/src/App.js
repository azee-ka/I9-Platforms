import React, { useState } from 'react';
import './App.css';
import { AuthProvider } from './utils/context/authentication';
import AppContent from './typeContent/AppContent';

function App() {

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
