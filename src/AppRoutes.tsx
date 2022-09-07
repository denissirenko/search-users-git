import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { SearchUsers } from './pages/SearchUsers/SearchUsers';
import { UserDetails } from './pages/UserDetails/UserDetails';

export const AppRoutes = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<SearchUsers />} />
        <Route path="/:userId" element={<UserDetails />} />
      </Routes>
    </div>
  );
};
