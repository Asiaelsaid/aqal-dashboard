import { useAuth } from "@hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<IProps> = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = useAuth();
  const role = localStorage.getItem("role");


  if (!isAuthenticated || role === null || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
