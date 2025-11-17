import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { Provider } from 'react-redux'; 
import { store } from './store/store'; 

import { AppRouter } from './router/AppRouter'; 

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  );
};

export default App;