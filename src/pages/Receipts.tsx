import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ReceiptsTable from "@components/FinancialsManagers/Receipts/ReceiptsTable";
import Button from "@components/UI/Button";
import AddReceiptModal from "@components/FinancialsManagers/Receipts/AddReceiptModal";
import useCustomQuery from "@hooks/useCustomQuery";

const Receipts = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
  
  const { data, isLoading, refetch } = useCustomQuery({
    queryKey: ["receipts", JSON.stringify(filters)],
    url: `tenants/receipts/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Receipts</h1>
              <p className="text-gray-600 mt-1">
                Manage and track all payment receipts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FiPlus size={16} />
              <Button
                label="Create Receipt"
                onClick={() => setIsAddModalOpen(true)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receipt Type
              </label>
              <select
                value={filters.receipt_type}
                onChange={(e) => handleFilterChange("receipt_type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="IBD">Inbound</option>
                <option value="OBD">Outbound</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property ID
              </label>
              <input
                type="text"
                value={filters.property_id}
                onChange={(e) => handleFilterChange("property_id", e.target.value)}
                placeholder="Filter by property"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={filters.start_date}
                onChange={(e) => handleFilterChange("start_date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              label="Clear Filters"
              variant="secondary"
              onClick={clearFilters}
            />
          </div>
        </div>

        <div className="p-6">
          <ReceiptsTable
            data={receipts}
            isLoading={isLoading}
            refetch={refetch}
          />
        </div>
      </div>

      <AddReceiptModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        refetch={refetch}
      />
    </div>
  );
};

export default Receipts;