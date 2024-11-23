import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiLayers, FiPieChart, FiSettings } from "react-icons/fi";
import Logo from "../assets/images/Logo.png";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { BsClipboard2Data, BsDatabaseCheck } from "react-icons/bs";
import { CgSupport } from "react-icons/cg";
export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`flex px-6 py-8 bg-mainColor text-textColor ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-500 h-screen ease-in-out flex flex-col`}
    >
      <div
        className="flex items-center justify-center text-l font-bold cursor-pointer "
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img src={Logo} alt="header logo" className="mr-2" />
        <span className={` ${isOpen ? "" : "hidden"}`}>Aqal Management</span>
      </div>

      <div className={`mt-6  ${isOpen ? "" : "hidden"}`}>
        <div className="flex items-center bg-hoverColor text-white text-opacity-70 rounded-lg px-4 py-2  shadow-md space-x-2 mt-3">
          <FiSearch className="text-white text-opacity-70 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white text-opacity-70 placeholder-white placeholder-opacity-70 w-full"
          />
        </div>
      </div>

      <div className="mt-6 space-y-4 flex-grow">
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
            <span
              className={`text-sm font-medium p-2 ${isOpen ? "" : "hidden"}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-auto space-y-4">
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
            <span
              className={`text-sm font-medium p-2 ${isOpen ? "" : "hidden"}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
