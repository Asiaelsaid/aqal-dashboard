import { useState } from "react";
import AddPropertyModal from "./AddProperty/AddPropertyModal";

interface IProps {}

const PropertiesFilter: React.FC<IProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle modal
  // const closePanel = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <div className="pb-4 space-y-6">
      <p className="text-base text-gray-500">
        Manage all your properties in one place
      </p>
      <hr />
      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 lg:w-1/2">
          <select className="w-full px-4 py-2 text-sm text-gray-500 bg-white border rounded-lg shadow-sm focus:ring-indigo-500 focus:outline-none">
            <option value="">Location</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Mombasa">Mombasa</option>
          </select>
          <select className="w-full px-4 py-2 text-sm text-gray-500 bg-white border rounded-lg shadow-sm focus:ring-indigo-500 focus:outline-none">
            <option value="">Date Range</option>
            <option value="Jan 6-13">Jan 6 - Jan 13</option>
            <option value="Jan 13-20">Jan 13 - Jan 20</option>
          </select>
          <select className="w-full px-4 py-2 text-sm text-gray-500 bg-white border rounded-lg shadow-sm focus:ring-indigo-500 focus:outline-none">
            <option value="">Price Range</option>
            <option value="$0-$100">$0 - $100</option>
          </select>
        </div>

        {/* Button */}
        <div className="lg:w-1/4 flex justify-end">
          <button
            onClick={openModal}
            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            + Add new property
          </button>
        </div>
      </div>
      <AddPropertyModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default PropertiesFilter;
