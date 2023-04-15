import { Navigate } from "react-router-dom";
// import { useAuth } from "../../customHooks/useAuth";
import { useAuth } from "../../customHooks/useAuth.js";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};