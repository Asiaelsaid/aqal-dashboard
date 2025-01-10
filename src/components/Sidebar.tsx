import { useEffect, useState } from "react";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import MobileSidebar from "./sidebar/MobileSidebar";

interface ISidebarProps {
  onSidebarToggle: (isOpen: boolean) => void;
}

export default function Sidebar({ onSidebarToggle }: ISidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => {
    setIsOpen(!isOpen);
    onSidebarToggle(!isOpen);
  };
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    const storedRole:string = localStorage.getItem("role") as string
    setRole(storedRole);
  }, []);
  return (
    <>
      <DesktopSidebar
        isOpen={isOpen}
        handleToggle={handleToggle}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        role={role}
      />
      <MobileSidebar
        isOpen={isOpen}
        handleToggle={handleToggle}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        role={role}
      />
    </>
  );
}
