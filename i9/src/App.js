// App.js
import React from 'react';
import './App.css'
import { Provider } from 'react-redux';
import store from './state/store';
import AppRouter from './routing/AppRouter';
import { AuthProvider } from './reducers/authReducer';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="App">
          <AppRouter />
        </div>
      </AuthProvider>
    </Provider>
  );
};

export default App;






// import React, { useState } from 'react';
// import './App.css';
// import { AuthProvider } from './utils/context/authentication';
// import AppContent from './typeContent/AppContent';

// function App() {

//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// export default App;
