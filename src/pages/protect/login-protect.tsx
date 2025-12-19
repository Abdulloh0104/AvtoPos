import { getItem } from "@helpers";
import { Navigate } from "react-router-dom";
import type { ProtectedRoute } from "@types";

const LoginProtect = ({ children }: ProtectedRoute) => {
  const isAuthenticated = getItem("access_token");
  if (isAuthenticated) {
    return <Navigate to={`/dashboard`} replace />;
  }
  return <>{children}</>;
};

export default LoginProtect;
