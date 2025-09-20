import { useState } from "react";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import { 
  FaFileInvoiceDollar, 
  FaCreditCard, 
  FaMoneyBillWave, 
  FaReceipt, 
  FaExclamationTriangle 
} from "react-icons/fa";
import useCustomQuery from "@hooks/useCustomQuery";

// Import existing financial components
import InvoicesTable from "@components/FinancialsManagers/Invoices/InvoicesTable";
import ReceiptsTable from "@components/FinancialsManagers/Receipts/ReceiptsTable";
import ExpensesReports from "@components/FinancialsManagers/Expenses/ExpensesReports";

// Create wrapper components for existing finance features
const InvoicesSegment = () => {
  const { data, isLoading, refetch } = useCustomQuery({
    queryKey: ["invoices"],
    url: "/tenants/invoices/",
  });

  const invoices = data?.data || [];

  return (
    <div className="space-y-4">
      <InvoicesTable 
        data={invoices} 
        isLoading={isLoading} 
        refetch={refetch} 
      />
    </div>
  );
};

const ReceiptsSegment = () => {
  const { data, isLoading, refetch } = useCustomQuery({
    queryKey: ["receipts"],
    url: "/tenants/receipts/",
  });

  const receipts = data?.data || [];

  return (
    <div className="space-y-4">
      <ReceiptsTable 
        data={receipts} 
        isLoading={isLoading} 
        refetch={refetch} 
      />
    </div>
  );
};

const ExpensesSegment = () => {
  return (
    <div className="space-y-4">
      <ExpensesReports />
    </div>
  );
};
const BillingComponent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Billing Management</h3>
    <p className="text-gray-600 mb-4">Manage billing cycles, statements, and payment schedules.</p>
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-medium text-blue-800 mb-2">Coming Soon</h4>
      <p className="text-blue-600 text-sm">
        This feature will include automated billing cycles, statement generation, 
        and payment reminder notifications.
      </p>
    </div>
  </div>
);

const ArrearsComponent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Arrears Management</h3>
    <p className="text-gray-600 mb-4">Track overdue payments and manage debt collection.</p>
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <h4 className="font-medium text-red-800 mb-2">Coming Soon</h4>
      <p className="text-red-600 text-sm">
        This feature will include overdue payment tracking, automatic escalation workflows, 
        and debt collection management tools.
      </p>
    </div>
  </div>
);

const Finances = () => {
  const [activeSegment, setActiveSegment] = useState<string>("invoices");

  const financeSegments = [
    {
      id: "invoices",
      label: "Invoices",
      icon: <FaFileInvoiceDollar className="text-xl" />,
      component: <InvoicesSegment />,
      description: "Create, manage, and track invoices"
    },
    {
      id: "billing",
      label: "Billing",
      icon: <FaCreditCard className="text-xl" />,
      component: <BillingComponent />,
      description: "Manage billing cycles and statements"
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: <FaMoneyBillWave className="text-xl" />,
      component: <ExpensesSegment />,
      description: "Track and categorize expenses"
    },
    {
      id: "receipts",
      label: "Receipts",
      icon: <FaReceipt className="text-xl" />,
      component: <ReceiptsSegment />,
      description: "Manage payment receipts"
    },
    {
      id: "arrears",
      label: "Arrears",
      icon: <FaExclamationTriangle className="text-xl" />,
      component: <ArrearsComponent />,
      description: "Track overdue payments"
    }
  ];

  const activeSegmentData = financeSegments.find(segment => segment.id === activeSegment);

  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Finances" />
      <SubHeading subHeading="Comprehensive financial management for your properties" />
      
      {/* Navigation Tabs */}
      <div className="mt-6 mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {financeSegments.map((segment) => (
              <button
                key={segment.id}
                onClick={() => setActiveSegment(segment.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeSegment === segment.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {segment.icon}
                <span>{segment.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Active Segment Header */}
      {activeSegmentData && (
        <div className="mb-6 bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600">
              {activeSegmentData.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {activeSegmentData.label}
              </h2>
              <p className="text-sm text-gray-600">
                {activeSegmentData.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Active Segment Content */}
      <div className="flex-1">
        {activeSegmentData?.component}
      </div>
    </div>
  );
};

export default Finances;