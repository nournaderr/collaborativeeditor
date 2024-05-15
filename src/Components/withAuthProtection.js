// PrivateRoute.js
import React from "react";
import { Navigate, Route } from "react-router-dom";

const withAuthProtection = (Component) => {
  const isAuthenticated = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  return function ProtectedRoute(props) {
    if (isAuthenticated()) {
      // If user is authenticated, render the component
      return <Component {...props} />;
    } else {
      // If user is not authenticated, navigate to the login page
      return <Navigate to="/" replace />;
    }
  };
};

export default withAuthProtection;
