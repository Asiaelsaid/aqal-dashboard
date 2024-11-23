import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";

interface IProps {}

const RootLayout: React.FC<IProps> = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
