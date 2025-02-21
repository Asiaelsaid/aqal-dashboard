import {
  // FiClipboard,
  FiLayers,
  FiLogOut,
  FiPieChart,
  // FiSearch,
  FiSettings,
  // FiUsers,
} from "react-icons/fi";
import Logo from "@assets/images/Logo.png";
import { BsClipboard2Data, BsDatabaseCheck } from "react-icons/bs";
import { BiBuildings, BiSolidSelectMultiple } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CgSupport } from "react-icons/cg";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logout } from "@store/auth/authSlice";
import useCustomQuery from "@hooks/useCustomQuery";

interface IProps {
  isOpen: boolean;
  handleToggle: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  role: string;
}

const DesktopSidebar: React.FC<IProps> = ({
  isOpen,
  handleToggle,
  activeItem,
  setActiveItem,
  role,
}) => {
  const dispatch = useDispatch();
  const { data } = useCustomQuery({
    queryKey: ["user-details"],
    url: "/users/details/",
  });
  const userDetails = data?.data;
  let sidebarItems = [
    { label: "Dashboard", icon: <BsClipboard2Data />, path: "/" },
    { label: "Properties", icon: <FiLayers />, path: "properties" },
    { label: "Tenants", icon: <BiSolidSelectMultiple />, path: "tenants" },
    { label: "Financials", icon: <BsDatabaseCheck />, path: "financials" },
    { label: "Reporting", icon: <FiPieChart />, path: "reporting" },
  ];

  if (role === "managers") {
    sidebarItems = [
      { label: "Dashboard", icon: <BsClipboard2Data />, path: "/" },
      {
        label: "Financials",
        icon: <BsDatabaseCheck />,
        path: "financials-managers",
      },
      { label: "Properties", icon: <FiLayers />, path: "properties" },
      { label: "Tenants", icon: <BiSolidSelectMultiple />, path: "tenants" },
      // { label: "Maintenance", icon: <CgSupport />, path: "maintenance" },
      {
        label: "Communication",
        icon: <HiOutlineHashtag />,
        path: "communication",
      },
      { label: "Requests", icon: <BsArrowUpRightSquare />, path: "requests" },
    ];
  } else if (role === "admin") {
    sidebarItems = [
      { label: "Dashboard", icon: <BsClipboard2Data />, path: "/" },
      { label: "Properties", icon: <BiBuildings />, path: "properties" },
      // { label: "Financials", icon: <BsDatabaseCheck />, path: "financials" },
      // {
      //   label: "User Management",
      //   icon: <FiUsers />,
      //   path: "user-management",
      // },
      // {
      //   label: "Reports",
      //   icon: <FiClipboard />,
      //   path: "reports",
      // },
      {
        label: "Communication",
        icon: <HiOutlineHashtag />,
        path: "communication",
      },
    ];
  } else if (role === "owners") {
    sidebarItems = [
      { label: "Dashboard", icon: <BsClipboard2Data />, path: "/" },
      { label: "Properties", icon: <FiLayers />, path: "properties" },
      { label: "Tenants", icon: <BiSolidSelectMultiple />, path: "tenants" },
      // { label: "Financials", icon: <BsDatabaseCheck />, path: "financials" },
      // { label: "Reporting", icon: <FiPieChart />, path: "reporting" },
    ];
  }

  return (
    <div
      className={`hidden lg:flex lg:flex-col fixed px-6 py-8 bg-mainColor text-textColor ${
        isOpen ? "w-64" : "w-24"
      } transition-width duration-500 h-screen fixed ease-in-out flex flex-col`}
    >
      <div
        className="flex items-center justify-center text-l font-bold cursor-pointer "
        onClick={handleToggle}
      >
        <img src={Logo} alt="header logo" className="mr-2" />
        <span className={`${isOpen ? "" : "hidden"}`}>Aqal Management</span>
      </div>

      {/* <div className={`mt-6 ${isOpen ? "" : "hidden"}`}>
        <div className="flex items-center bg-hoverColor text-white text-opacity-70 rounded-lg px-4 py-2 shadow-md space-x-2 mt-3">
          <FiSearch className="text-white text-opacity-70 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white text-opacity-70 placeholder-white placeholder-opacity-70 w-full"
          />
        </div>
      </div> */}

      <div className="mt-6 space-y-2 flex-grow">
        {sidebarItems.map((item) => (
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

      <div className="mt-auto space-y-1">
        {[{ label: "Settings", icon: <FiSettings />, path: "settings" }].map(
          (item) => (
            <Link
              to={item.path}
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center p-1 rounded-lg cursor-pointer hover:bg-hoverColor ${
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
          )
        )}

        {role === "owners" && (
          <Link
            to="support"
            onClick={() => setActiveItem("Support")}
            className={`flex items-center p-1 rounded-lg cursor-pointer hover:bg-hoverColor ${
              activeItem === "Support" ? "bg-hoverColor" : ""
            }`}
          >
            <span className="text-xl mr-3">{<CgSupport />}</span>
            <span
              className={`text-sm font-medium p-2 ${isOpen ? "" : "hidden"}`}
            >
              Support
            </span>
          </Link>
        )}
        <div
          className={`flex items-center justify-between ${
            isOpen ? "p-2" : ""
          }  mt-4 `}
        >
          <img
            src={userDetails?.profile_photo || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-11 h-11 rounded-full object-cover mr-3"
          />
          <div className={`${isOpen ? "" : "hidden"} flex flex-col`}>
            <span className="text-sm font-medium">
              {userDetails?.first_name} {userDetails?.last_name}
            </span>
            <span className="text-xs text-opacity-60 text-gray-100">
              {userDetails?.email}
            </span>
          </div>
          <FiLogOut
            className={`${
              isOpen ? "" : "hidden"
            } text-lg cursor-pointer text-white flex-shrink-0`}
            onClick={() => dispatch(logout())}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
