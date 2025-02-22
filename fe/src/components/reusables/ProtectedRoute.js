// import React from "react";
// import { Navigate } from "react-router-dom";
// import { isTokenValid } from "./Functions";

// // ProtectedRoute Component
// const ProtectedRoute = ({ element: Component, ...rest }) => {
//     // const navigate = useNavigate();
//   const isAuthenticated = isTokenValid();

//   // if (!isAuthenticated) {
//   //   // Redirect to login if not authenticated
//   //   return <Navigate to="/signin" />;
//   // }

//   return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;

//   // Render the component if authenticated
//   return <Component />;
// };

// export default ProtectedRoute;

import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, userId, getToken } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();

  // Wait for Clerk to load authentication status before redirecting
  if (!isLoaded) return <div>Loading...</div>;
  // if (isUserLoaded) console.log(">>>>"+user.username)

  // return isSignedIn ? children : <Navigate to="https://upward-tiger-76.accounts.dev/sign-in" />;
  return isSignedIn ? children : (window.location.href = "https://upward-tiger-76.accounts.dev/sign-in");

};

export default ProtectedRoute;