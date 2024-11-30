import React from "react";
import { FiSearch } from "react-icons/fi";

const PropertiesHeader: React.FC = () => {
  return (
    <div className="px-6 py-4 space-y-6">
      {/* First Row: Title and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Title  */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
        </div>
        {/* Search Input */}
        <div className="flex items-center w-full max-w-md px-4 py-2 text-gray-500 bg-white border rounded-lg shadow-sm space-x-2 lg:w-1/4">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeader;
