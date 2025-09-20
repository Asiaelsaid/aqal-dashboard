import { useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import RevenueExpensesChart from "./RevenueExpensesChart";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import RentCollectionProgress from "./RentCollectionProgress";
import ActivityTable from "./ActivityTable";
import useCustomQuery from "@hooks/useCustomQuery";
import RentAmountChart from "../ManagersDashboard/RentAmountChart";
import UnitTypeDistributionChart from "./UnitTypeDistributionChart";
import RevenueByUnitTypeChart from "./RevenueByUnitTypeChart";
import ServiceChargePieChart from "./ServiceChargePieChart";
import DashboardAlerts from "./DashboardAlerts";
import DashboardRequestsShortcut from "./DashboardRequestsShortcut";
import RequestsSummaryCard from "./RequestsSummaryCard";

interface SeriesData {
  name: string;
  data: number[];
}

interface Unit {
  unit_id: number;
  unit_number: string;
  property_name: string;
  series: SeriesData[];
}

interface UnitRentAnalysis {
  labels: string[];
  units: Unit[];
}

const OwnersDashboard = () => {
  const { data } = useCustomQuery({
    queryKey: ["dashboard"],
    url: "/owners/properties/dashboard/",
  });

  const dashboardData = data?.data;
  const unitRentAnalysis: UnitRentAnalysis = dashboardData?.unit_rent_analysis || { labels: [], units: [] };

  const { data: userResponse } = useCustomQuery({
    queryKey: ["user-details"],
    url: "/users/details/",
  });

  const userDetails = userResponse?.data;
  const recentActivity = dashboardData?.recent_activity || [];
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const storedRole: string = localStorage.getItem("role") as string;
    setRole(storedRole);
  }, []);

  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading={`Welcome to Aqal, ${userDetails?.first_name || ""} ${userDetails?.last_name || ""}`} />
      <SubHeading subHeading="Manage your properties, tenants, and finances all in one place." />
      
      {/* Enhanced Overview Cards */}
      <div className={`my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${role === "managers" ? "xl:grid-cols-6" : "xl:grid-cols-5"} gap-4`}>
        <OverviewCard
          title="Total Properties"
          value={dashboardData?.total_properties || 0}
          icon="🏢"
        />
        <OverviewCard
          title="Total Units"
          value={dashboardData?.total_units || 0}
          icon="🏠"
          subtitle="All unit types"
        />
        <OverviewCard
          title="Residential Units"
          value={dashboardData?.residential_units_count || 0}
          icon="🏠"
          badgeColor="blue"
          subtitle={`${dashboardData?.residential_occupancy_rate || 0}% occupied`}
        />
        <OverviewCard
          title="Commercial Units"
          value={dashboardData?.commercial_units_count || 0}
          icon="🏪"
          badgeColor="green"
          subtitle={`${dashboardData?.commercial_occupancy_rate || 0}% occupied`}
        />
        <OverviewCard
          title="Bought Units"
          value={dashboardData?.bought_units_count || 0}
          icon="💰"
          badgeColor="purple"
        />
        {role === "managers" && <RequestsSummaryCard />}
        {/* <OverviewCard
          title="Outstanding Payments"
          value={`$${(dashboardData?.total_outstanding_payment || 0).toLocaleString()}`}
          icon="💳"
          badgeColor="red"
        /> */}
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue vs Expenses Chart */}
        <div className="lg:col-span-2">
          <RevenueExpensesChart
            revenueExpenses={dashboardData?.revenue_vs_expenses || {}}
          />
        </div>
        
        {/* Rent Collection Progress */}
        <div className="lg:col-span-1">
          <RentCollectionProgress
            rentCollectedThisMonth={dashboardData?.rent_collected_this_month}
            rentGoal={dashboardData?.rent_goal_this_month}
          />
        </div>
      </div>

      {/* Revenue Analysis, Unit Distribution, and Service Charges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue by Unit Type */}
        <div className="lg:col-span-1">
          <RevenueByUnitTypeChart
            data={dashboardData?.revenue_by_unit_type || {
              labels: [],
              datasets: []
            }}
          />
        </div>
        
        {/* Unit Type Distribution */}
        <div className="lg:col-span-1">
          <UnitTypeDistributionChart
            data={dashboardData?.unit_type_distribution || {
              residential: 0,
              commercial: 0,
              bought: 0,
              vacant: 0,
              occupied: 0
            }}
          />
        </div>

        {/* Service Charge Distribution */}
        <div className="lg:col-span-1">
          <ServiceChargePieChart
            data={dashboardData?.service_charge_analysis || {
              pie_chart_data: [],
              total_service_charge_due: 0,
              total_service_charge_paid: 0,
              service_charge_collection_rate: 0
            }}
          />
        </div>
      </div>

      {/* Unit Rent Analysis and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Unit Rent Analysis (for managers) */}
        {unitRentAnalysis?.units && (
          <div className="lg:col-span-2">
            <RentAmountChart data={unitRentAnalysis} />
          </div>
        )}
        
        {/* Alerts and Notifications */}
        <div className="lg:col-span-1">
          <DashboardAlerts
            occupancyRate={dashboardData?.unit_occupancy_rate || 0}
            outstandingPayments={dashboardData?.total_outstanding_payment || 0}
            maintenanceRequests={dashboardData?.opened_maintenance_requests || 0}
          />
        </div>
      </div>

      {/* Recent Requests Section - Managers Only */}
      {role === "managers" && (
        <div className="mb-6">
          <DashboardRequestsShortcut />
        </div>
      )}

      {/* Recent Activity */}
      {(role === "owners" || role === "managers") && (
        <div className="mb-6">
          <ActivityTable recentActivity={recentActivity} />
        </div>
      )}
    </div>
  );
};

export default OwnersDashboard;
