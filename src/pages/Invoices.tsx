import { useState } from "react";
import InvoicesTable from "@components/FinancialsManagers/Invoices/InvoicesTable";
import Button from "@components/UI/Button";
import AddInvoiceModal from "@components/FinancialsManagers/Invoices/AddInvoiceModal";
import CreateCollectionModal from "@components/FinancialsManagers/Invoices/CreateCollectionModal";
import useCustomQuery from "@hooks/useCustomQuery";

const Invoices = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    invoice_type: "",
    status: "",
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
    queryKey: ["invoices", JSON.stringify(filters)],
    url: `tenants/invoices/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
  });

  const invoices = data?.data || [];

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      invoice_type: "",
      status: "",
      property_id: "",
      start_date: "",
      end_date: "",
    });
  };

  const handleInvoiceSelection = (invoiceId: number, selected: boolean) => {
    if (selected) {
      setSelectedInvoices(prev => [...prev, invoiceId]);
    } else {
      setSelectedInvoices(prev => prev.filter(id => id !== invoiceId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allInvoiceIds = invoices.map((invoice: any) => invoice.id);
      setSelectedInvoices(allInvoiceIds);
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleCreateCollection = () => {
    if (selectedInvoices.length === 0) {
      alert("Please select at least one invoice to create a collection.");
      return;
    }
    setIsCollectionModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
              <p className="text-gray-600 mt-1">
                Create and manage invoices for your properties
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                label="Create Invoice"
                onClick={() => setIsAddModalOpen(true)}
              />
              {selectedInvoices.length > 0 && (
                <Button
                  label={`Create Collection (${selectedInvoices.length})`}
                  onClick={handleCreateCollection}
                  variant="secondary"
                />
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Type
              </label>
              <select
                value={filters.invoice_type}
                onChange={(e) => handleFilterChange("invoice_type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="rent">Rent Invoice</option>
                <option value="service">Service Invoice</option>
                <option value="maintenance">Maintenance Invoice</option>
                <option value="utility">Utility Invoice</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
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
          <InvoicesTable
            data={invoices}
            isLoading={isLoading}
            refetch={refetch}
            selectedInvoices={selectedInvoices}
            onInvoiceSelection={handleInvoiceSelection}
            onSelectAll={handleSelectAll}
            showSelection={true}
          />
        </div>
      </div>

      <AddInvoiceModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        refetch={refetch}
      />

      <CreateCollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        selectedInvoiceIds={selectedInvoices}
        onSuccess={() => {
          refetch();
          setSelectedInvoices([]);
        }}
      />
    </div>
  );
};

export default Invoices;
