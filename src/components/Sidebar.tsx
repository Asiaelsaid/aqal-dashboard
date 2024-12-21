import { useState } from "react";
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
  return (
    <>
      <DesktopSidebar
        isOpen={isOpen}
        handleToggle={handleToggle}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <MobileSidebar
        isOpen={isOpen}
        handleToggle={handleToggle}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
    </>
  );
}
