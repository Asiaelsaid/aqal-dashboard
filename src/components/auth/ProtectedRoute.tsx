import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
    isAllowed: boolean;
    redirectPath: string;
    children: ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({isAllowed,redirectPath,children}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} />;
    }
    return children;
};

export default ProtectedRoute;