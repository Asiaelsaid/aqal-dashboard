import { useAuth } from "@hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({children}) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    return <>{children}</>;
};

export default ProtectedRoute;