import { FiLayers, FiPieChart, FiSettings } from "react-icons/fi";
import Logo from "@assets/images/Logo.png";
import {
  BsArrowUpRightSquare,
  BsClipboard2Data,
  BsDatabaseCheck,
} from "react-icons/bs";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CgSupport } from "react-icons/cg";

interface IProps {
  isOpen: boolean;
  handleToggle: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const MobileSidebar: React.FC<IProps> = ({
  isOpen,
  handleToggle,
  activeItem,
  setActiveItem,
}) => {
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
        <>
          <div className="flex justify-center p-4">
            <img src={Logo} alt="header logo" className="w-10 h-10" />
          </div>

          {/* Main Navigation Links */}
          <div className="flex flex-col space-y-4 mt-6">
            {[
              { label: "Dashboard", icon: <BsClipboard2Data />, path: "/" },
              { label: "Properties", icon: <FiLayers />, path: "properties" },
              {
                label: "Tenants",
                icon: <BiSolidSelectMultiple />,
                path: "tenants",
              },
              {
                label: "Financials",
                icon: <BsDatabaseCheck />,
                path: "financials",
              },
              { label: "Reporting", icon: <FiPieChart />, path: "reporting" },
              {
                label: "Requests",
                icon: <BsArrowUpRightSquare />,
                path: "requests",
              },
            ].map((item) => (
              <Link
                to={item.path}
                key={item.label}
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
            ))}
          </div>

          {/* Additional Links (Support, Settings) */}
          <div className="flex flex-col space-y-4 mt-auto">
            {[
              { label: "Support", icon: <CgSupport />, path: "support" },
              { label: "Settings", icon: <FiSettings />, path: "settings" },
            ].map((item) => (
              <Link
                to={item.path}
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-hoverColor ${
                  activeItem === item.label ? "bg-hoverColor" : ""
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileSidebar;
