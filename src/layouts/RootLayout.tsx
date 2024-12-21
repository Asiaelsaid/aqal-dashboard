import Sidebar from "@components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleSidebarToggle = (isOpen: boolean): void => {
    setIsSidebarOpen(isOpen);
  };
  return (
    <div className="flex">
      <Sidebar onSidebarToggle={handleSidebarToggle} />
      <div
        className={`flex-grow transition-all duration-300 ${
          isSidebarOpen ? "pl-64" : "pl-20"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;