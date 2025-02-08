// import AdminDashboard from "@components/DashboardUsers/AdminDashboard/AdminDashboard";
// import ManagersDashboard from "@components/DashboardUsers/ManagersDashboard/ManagersDashboard";
import OwnersDashboard from "@components/DashboardUsers/OwnersDashboard/OwnersDashboard";

const Dashboard = () => {
  // const role = localStorage.getItem("role");

  return (
    <>
      {/* {role === "admin" && <AdminDashboard />}
      {role === "owners" && <OwnersDashboard />}
      {role === "managers" && <ManagersDashboard />} */}
      <OwnersDashboard />
    </>
  );
};

export default Dashboard;
