import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "./Functions";

// ProtectedRoute Component
const ProtectedRoute = ({ element: Component, ...rest }) => {
    // const navigate = useNavigate();
  const isAuthenticated = isTokenValid();

  // if (!isAuthenticated) {
  //   // Redirect to login if not authenticated
  //   return <Navigate to="/signin" />;
  // }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;

  // Render the component if authenticated
  return <Component />;
};

export default ProtectedRoute;