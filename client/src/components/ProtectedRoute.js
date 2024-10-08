import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!sessionStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
