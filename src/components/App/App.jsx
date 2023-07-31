import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from '../AppRouter/AppRouter';
// import { BrowserRouter } from 'react-router-dom'; //for gh page

const App = () => {
  return (
      <div>
          <HashRouter>
              <AppRouter />
          </HashRouter>
      </div>
  );
};

export default App;
