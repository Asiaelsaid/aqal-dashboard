import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import { FaCreditCard } from "react-icons/fa";

const Billing = () => {
  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Billing Management" />
      <SubHeading subHeading="Manage billing cycles, statements, and payment schedules" />
      
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Overview</h3>
          
          {/* Coming Soon Content */}
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 mb-4">
              <FaCreditCard className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Feature Coming Soon</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              The billing management feature is currently under development and will be available in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;