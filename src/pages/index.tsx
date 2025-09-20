import { useEffect, useState } from "react";
import AdminDashboard from "@components/DashboardUsers/AdminDashboard/AdminDashboard";
import OwnersDashboard from "@components/DashboardUsers/OwnersDashboard/OwnersDashboard";

const Dashboard = () => {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const storedRole: string = localStorage.getItem("role") as string;
    setRole(storedRole);
  }, []);

  return (
    <>
      {role === "admin" && <AdminDashboard />}
      {(role === "owners" || role === "managers") && <OwnersDashboard />}
    </>
  );
};

export default Dashboard;
