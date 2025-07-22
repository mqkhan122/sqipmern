import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("admintoken");

      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("admintoken");
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (err) {
        setIsAuthorized(false);
      }
    };

    checkToken();

    // Optional: check every time page gains focus
    window.addEventListener("focus", checkToken);

    return () => {
      window.removeEventListener("focus", checkToken);
    };
  }, []);

  if (isAuthorized === null) {
    return <p>Loading...</p>;
  }

  if (!isAuthorized) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
