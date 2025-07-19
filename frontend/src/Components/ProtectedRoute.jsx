import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("admintoken");

  if (!token) {
    return <Navigate to="/adminlogin" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Optional: Token expiry check
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("admintoken");
      return <Navigate to="/adminlogin" replace />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/adminlogin" replace />;
  }
};

export default ProtectedRoute;
