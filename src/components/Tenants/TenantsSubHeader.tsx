import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddTenantModal from "./AddTenant/AddTenantModal";

const TenantsSubHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2 sm:space-y-0 space-y-6 sm:justify-between lg:flex-row lg:items-center lg:space-x-8">
      <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
          12 months
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
          30 days
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
          7 days
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
          24 hours
        </button>
      </div>
      <div className="flex justify-center sm:justify-end w-full sm:w-auto">
        <button
          onClick={openModal}
          className="px-6 py-3 flex items-center text-sm font-medium text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700"
        >
         <FaPlus className="mr-2"/> Add new tenants
        </button>
      </div>
      <AddTenantModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default TenantsSubHeader;
