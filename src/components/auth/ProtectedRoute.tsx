import { useAuth } from "@hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
  allowedRole?: string;
}

const ProtectedRoute: React.FC<IProps> = ({ children, allowedRole }) => {
  const isAuthenticated = useAuth();
  const role = localStorage.getItem("role");

  if (!isAuthenticated || (allowedRole && role !== allowedRole)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
