import { useState } from "react";
import ReceiptsTable from "@components/FinancialsManagers/Receipts/ReceiptsTable";
import useCustomQuery from "@hooks/useCustomQuery";

const OwnerReceipts = () => {
  const [filters, setFilters] = useState({
    receipt_type: "",
    property_id: "",
    start_date: "",
    end_date: "",
  });
  
  // Build query parameters
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });
  
  const { data, isLoading } = useCustomQuery({
    queryKey: ["owner-receipts", JSON.stringify(filters)],
    url: `owners/receipts/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
  });

  const receipts = data?.data || [];

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      receipt_type: "",
      property_id: "",
      start_date: "",
      end_date: "",
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Receipts</h1>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receipt Type
              </label>
              <select
                value={filters.receipt_type}
                onChange={(e) => handleFilterChange("receipt_type", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="rent">Rent</option>
                <option value="deposit">Deposit</option>
                <option value="utility">Utility</option>
                <option value="maintenance">Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={filters.start_date}
                onChange={(e) => handleFilterChange("start_date", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={filters.end_date}
                onChange={(e) => handleFilterChange("end_date", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <ReceiptsTable 
            data={receipts} 
            isLoading={isLoading}
            refetch={() => {}} // No refetch needed for view-only access
          />
        </div>
      </div>
    </div>
  );
};

export default OwnerReceipts;
