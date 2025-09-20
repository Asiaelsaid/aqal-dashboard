import { FiLayers, FiPieChart, FiSettings, FiPrinter, FiLogOut, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import userProfile from "../../assets/images/profile.png";
import useCustomQuery from "@hooks/useCustomQuery";
import { useDispatch } from "react-redux";
import { logout } from "@store/auth/authSlice";
import Logo from "@assets/images/Logo.png";
import {
  BsArrowUpRightSquare,
  BsClipboard2Data,
  BsDatabaseCheck,
  BsNewspaper,
} from "react-icons/bs";
import { BiBuildings, BiSolidSelectMultiple } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CgSupport } from "react-icons/cg";
import { HiOutlineHashtag } from "react-icons/hi";

interface IProps {
  isOpen: boolean;
  handleToggle: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  role: string;
}

const MobileSidebar: React.FC<IProps> = ({
  isOpen,
  handleToggle,
  activeItem,
  setActiveItem,
  role,
}) => {
  const dispatch = useDispatch();
  const [isFinancesOpen, setIsFinancesOpen] = useState(false);
  const { data } = useCustomQuery({
    queryKey: ["user-details"],
    url: "/users/details/",
  });
  const userDetails = data?.data;
  let sidebarItems = [
    { label: "Dashboard", icon: <BsClipboard2Data />, path: "/dashboard" },
    { label: "Properties", icon: <FiLayers />, path: "properties" },
    { label: "Tenants", icon: <BiSolidSelectMultiple />, path: "tenants" },
    { label: "Financials", icon: <BsDatabaseCheck />, path: "financials" },
    { label: "Reporting", icon: <FiPieChart />, path: "reporting" },
  ];

  const financeItems = [
    { label: "Invoices", icon: <FiPrinter />, path: "invoices" },
    { label: "Billing", icon: <BsDatabaseCheck />, path: "billing" },
    { label: "Expenses", icon: <BsDatabaseCheck />, path: "financials-managers" },
    { label: "Receipts", icon: <FiPrinter />, path: "receipts" },
    { label: "Arrears", icon: <BsNewspaper />, path: "arrears" },
  ];

  if (role === "managers") {
    sidebarItems = [
      { label: "Dashboard", icon: <BsClipboard2Data />, path: "/dashboard" },
      { 
        label: "Finances", 
        icon: <BsDatabaseCheck />, 
        path: "#",
        isDropdown: true,
        subItems: financeItems
      } as any,
      { label: "Properties", icon: <FiLayers />, path: "properties" },
      { label: "Tenants", icon: <BiSolidSelectMultiple />, path: "tenants" },
      // Legacy financial routes - keeping for backward compatibility
      { label: "Payments", icon: <BsDatabaseCheck />, path: "manager-payments" },
      { label: "CCTV", icon: <FiPrinter />, path: "CCTV" },
      {
        label: "Communication",
        icon: <HiOutlineHashtag />,
        path: "communication",
      },
      { label: "Requests", icon: <BsArrowUpRightSquare />, path: "requests" },
      { label: "Reports", icon: <BsNewspaper />, path: "reports" },
    ];
  } else if (role === "admin") {
    sidebarItems = [
      { label: "Dashboard", icon: <BsClipboard2Data />, path: "/dashboard" },
      { label: "Properties", icon: <BiBuildings />, path: "properties" },
      {
        label: "Communication",
        icon: <HiOutlineHashtag />,
        path: "communication",
      },
    ];
  } else if (role === "owners") {
    sidebarItems = [
      { label: "Dashboard", icon: <BsClipboard2Data />, path: "/dashboard" },
      { label: "Properties", icon: <FiLayers />, path: "properties" },
      { label: "Tenants", icon: <BiSolidSelectMultiple />, path: "tenants" },
      // Consolidated Finances dropdown
      { 
        label: "Finances", 
        icon: <BsDatabaseCheck />, 
        path: "#",
        isDropdown: true,
        subItems: financeItems
      } as any,
      // Legacy financial routes - keeping for backward compatibility
      { label: "Payments", icon: <BsDatabaseCheck />, path: "owner-payments" },
      { label: "CCTV", icon: <FiPrinter />, path: "owner-cctv" },
      { label: "Communication", icon: <HiOutlineHashtag />, path: "owner-communication" },
      { label: "Reports", icon: <BsNewspaper />, path: "Reports" },
      { label: "Notifications", icon: <BsClipboard2Data />, path: "owner-notifications" },
    ];
  }
  return (
    <div
      className={`lg:hidden fixed top-0 left-0 h-full text-textColor ${
        isOpen ? "bg-mainColor w-64" : "bg-transparent w-20"
      } transition-all duration-300 ease-in-out z-50 flex flex-col`}
    >
      <div className="flex justify-between items-center p-4">
        <button
          className={`${
            isOpen ? "text-white text-2xl" : "text-purple-500 text-2xl"
          }`}
          onClick={handleToggle}
        >
          ☰
        </button>
      </div>

      {/* Sidebar Content (Visible only when isOpen is true) */}
      {isOpen && (
        <div className="flex flex-col min-h-0 overflow-y-scroll" style={{height: '100vh'}}>
          <div className="flex justify-center p-4">
            <img src={Logo} alt="header logo" className="w-10 h-10" />
          </div>

          {/* Main Navigation Links */}
          <div className="flex flex-col space-y-4 mt-6">
            {sidebarItems.map((item: any) => (
              <div key={item.label}>
                {item.isDropdown ? (
                  // Dropdown menu item
                  <div>
                    <button
                      onClick={() => setIsFinancesOpen(!isFinancesOpen)}
                      className={`flex items-center justify-between w-full p-2 rounded-lg cursor-pointer hover:bg-hoverColor ${
                        activeItem.startsWith("finance") ? "bg-hoverColor" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{item.icon}</span>
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm">
                        {isFinancesOpen ? <FiChevronDown /> : <FiChevronRight />}
                      </span>
                    </button>
                    
                    {/* Dropdown submenu */}
                    {isFinancesOpen && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.subItems?.map((subItem: any) => (
                          <Link
                            to={subItem.path}
                            key={subItem.label}
                            onClick={() => {
                              setActiveItem(subItem.label);
                              handleToggle();
                            }}
                            className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-hoverColor ${
                              activeItem === subItem.label ? "bg-hoverColor" : ""
                            }`}
                          >
                            <span className="text-lg mr-3">{subItem.icon}</span>
                            <span className="text-sm font-medium">
                              {subItem.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular menu item
                  <Link
                    to={item.path}
                    onClick={() => {
                      setActiveItem(item.label);
                      handleToggle();
                    }}
                    className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-hoverColor ${
                      activeItem === item.label ? "bg-hoverColor" : ""
                    }`}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Additional Links (Support, Settings) */}
          <div className="flex flex-col space-y-1 mt-auto">
            <Link
              to="settings"
              onClick={() => setActiveItem("Settings")}
              className={`flex items-center p-1 rounded-lg cursor-pointer hover:bg-hoverColor ${
                activeItem === "Settings" ? "bg-hoverColor" : ""
              }`}
            >
              <span className="text-xl mr-3"><FiSettings /></span>
              <span className={`text-sm font-medium p-2 ${isOpen ? "" : "hidden"}`}>Settings</span>
            </Link>

            {role === "owners" && (
              <Link
                to="support"
                onClick={() => setActiveItem("Support")}
                className={`flex items-center p-1 rounded-lg cursor-pointer hover:bg-hoverColor ${
                  activeItem === "Support" ? "bg-hoverColor" : ""
                }`}
              >
                <span className="text-xl mr-3"><CgSupport /></span>
                <span className={`text-sm font-medium p-2 ${isOpen ? "" : "hidden"}`}>Support</span>
              </Link>
            )}

            {/* User Info & Logout (always visible at bottom when sidebar is open) */}
            {isOpen && (
              <div className="flex items-center justify-between p-2 mt-4 border-t border-gray-200">
                <img
                  src={userDetails?.profile_photo ? userDetails?.profile_photo : userProfile}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {userDetails?.first_name} {userDetails?.last_name}
                  </span>
                  <span className="text-xs text-opacity-60 text-gray-100">
                    {userDetails?.email}
                  </span>
                </div>
                <FiLogOut
                  className="text-lg cursor-pointer text-white flex-shrink-0"
                  onClick={() => dispatch(logout())}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
