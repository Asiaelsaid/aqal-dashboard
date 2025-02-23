import OverviewCard from "./OverviewCard";
import RevenueExpensesChart from "./RevenueExpensesChart";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import RentCollectionProgress from "./RentCollectionProgress";
import ActivityTable from "./ActivityTable";
import useCustomQuery from "@hooks/useCustomQuery";
import RentAmountChart from "../ManagersDashboard/RentAmountChart";


import { useEffect, useState } from "react";

interface UnitData {
  unit_number: number;
  rent_collected: Record<string, number>;
  rent_due: Record<string, number>;
}
const OwnersDashboard = () => {
  const { data } = useCustomQuery({
    queryKey: ["dashboard"],
    url: "/owners/properties/dashboard/",
  });
  const dashboardData = data?.data;
  const unitRentAnalysis = dashboardData?.unit_rent_analysis || {};
  const recentActivity = dashboardData?.recent_activity || [];
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    const storedRole: string = localStorage.getItem("role") as string;
    setRole(storedRole);
  }, []);
  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Welcome to Aqal, Olivia" />
      <SubHeading subHeading="Manage your properties, tenants, and finances all in one place." />
      {/* Overview Cards */}
      <div className=" my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <OverviewCard
          title="Total properties"
          value={dashboardData?.total_properties || 0}
          // change={10}
        />
        <OverviewCard
          title="Maintenance requests"
          value={dashboardData?.opened_maintenance_requests || 0}
          // change={12}
        />
        <OverviewCard
          title="Outstanding payments"
          value={`$${dashboardData?.total_outstanding_payment || 0}`}
          // change={-100}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 ">
        {/* Revenue vs Expenses */}
        <div className="col-span-1 sm:col-span-5">
          <RevenueExpensesChart
            revenueExpenses={dashboardData?.revenue_vs_expenses || {}}
          />
        </div>
        {/* Rent Collection Progress */}
        <div className="col-span-1 sm:col-span-2">
          <RentCollectionProgress
            rentCollectedThisMonth={dashboardData?.rent_collected_this_month}
            rentGoal={dashboardData?.total_outstanding_payment}
          />
        </div>
      </div>
      {role === "managers" && (
        <RentAmountChart
          data={
            unitRentAnalysis?.units?.map((unit: UnitData) => ({
              name: `Unit ${unit.unit_number}`,
              collected: Object.values(unit.rent_collected).reduce(
                (acc, val) => acc + val,
                0
              ),
              toBeCollected: Object.values(unit.rent_due).reduce(
                (acc, val) => acc + val,
                0
              ),
            })) || []
          }
        />
      )}
      {(role === "owners" || role === "managers") && (
        <ActivityTable recentActivity={recentActivity} />
      )}
    </div>
  );
};

export default OwnersDashboard;
