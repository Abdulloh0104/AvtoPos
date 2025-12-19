import { Navigate } from "react-router-dom";
import type { ProtectedRoute } from "../../types";

const ProtectedRoute = ({ children }: ProtectedRoute) => {
  const isAuthenticated = localStorage.getItem("access_token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
