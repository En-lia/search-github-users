import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import UserPage from '../../pages/UserPage/UserPage';
import SearchUsersPage from '../../pages/SearchUsersPage/SearchUsersPage';

const AppRouter = () => {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route path="/" element={<SearchUsersPage />} />
              <Route path="/user/:login" element={<UserPage />} />
          </Route>
      </Routes>
  );
};

export default AppRouter;