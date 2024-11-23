import FixedSection from "../components/auth/FixedSection";
import { ReactNode } from "react";
interface IProps {
  children: ReactNode;
}

const AuthLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <FixedSection />
      {children}
    </div>
  );
};

export default AuthLayout;
