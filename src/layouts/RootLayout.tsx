// import Sidebar from "@components/Sidebar";
// import { useState } from "react";
// import { Outlet } from "react-router-dom";

// const RootLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const handleSidebarToggle = (isOpen: boolean): void => {
//     setIsSidebarOpen(isOpen);
//   };
//   return (
//     <div className="flex">
//       <Sidebar onSidebarToggle={handleSidebarToggle} />
//       <div
//         className={`flex-grow transition-all duration-300 ${
//           isSidebarOpen ? "pl-64 sm:pl-64" : "pl-2 md:pl-20 "
//         } `}
//       >
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default RootLayout;
import Sidebar from "@components/Sidebar";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group"; // Import the transition components

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const handleSidebarToggle = (isOpen: boolean): void => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onSidebarToggle={handleSidebarToggle} />

      {/* Page Content with CSSTransition */}
      <div
        className={`flex-grow transition-all duration-300 ${
          isSidebarOpen ? "pl-64" : "pl-20"
        }`}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={location.pathname}
            timeout={200} 
            classNames="page" 
            unmountOnExit
            appear
          >
            <div className="page">
             
              <Outlet />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default RootLayout;
