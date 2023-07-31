import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../AppRouter/AppRouter';

const App = () => {
  return (
      <div>
          <BrowserRouter>
              <AppRouter />
          </BrowserRouter>
      </div>
  );
};

export default App;
