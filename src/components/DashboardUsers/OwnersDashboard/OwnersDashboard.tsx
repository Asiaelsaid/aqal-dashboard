import OverviewCard from "./OverviewCard";
import RevenueExpensesChart from "./RevenueExpensesChart";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import RentCollectionProgress from "./RentCollectionProgress";
import ActivityTable from "./ActivityTable";
import ButtonsFiter from "./ButtonsFiter";
import useCustomQuery from "@hooks/useCustomQuery";

const OwnersDashboard = () => {
  const { data } = useCustomQuery({
    queryKey: ["dashboard"],
    url: "/owners/properties/dashboard/",
  });
  const dashboardData = data?.data;
  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Welcome to Aqal, Olivia" />
      <SubHeading subHeading="Manage your properties, tenants, and finances all in one place." />
      <ButtonsFiter />
      {/* Overview Cards */}
      <div className=" my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <OverviewCard
          title="Total properties"
          value={dashboardData?.total_properties || 0}
          change={10}
        />
        <OverviewCard
          title="Maintenance requests"
          value={dashboardData?.opened_maintenance_requests || 0}
          change={12}
        />
        <OverviewCard
          title="Outstanding payments"
          value={`$${dashboardData?.total_outstanding_payment || 0}`}
          change={-100}
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
          <RentCollectionProgress />
        </div>
      </div>
      <ActivityTable />
    </div>
  );
};

export default OwnersDashboard;
