import { useState } from "react";
import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import useCustomQuery from "@hooks/useCustomQuery";
import useAxios from "@config/axios.config";
import { useMutation } from "@tanstack/react-query";
import { InvoiceCollection } from "@interfaces/index";

const InvoiceCollections = () => {
  const [filters, setFilters] = useState({
    status: "",
  });

  const axiosInstance = useAxios();

  // Build query parameters
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  const { data, isLoading, refetch } = useCustomQuery({
    queryKey: ["invoice-collections", JSON.stringify(filters)],
    url: `tenants/invoice-collections/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
  });

  const collections = data?.data || [];

  const { mutate: deleteCollection } = useMutation({
    mutationFn: async (collectionId: number) => {
      const response = await axiosInstance.delete(`tenants/invoice-collections/${collectionId}/`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Collection deleted successfully!");
      refetch();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete collection");
    },
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
    });
  };

  const handleViewCollection = (collection: InvoiceCollection) => {
    // TODO: Implement view collection modal
    console.log("View collection:", collection);
  };

  const handleDownloadPDF = (collection: InvoiceCollection) => {
    if (collection.pdf_file) {
      // Download existing PDF
      const link = document.createElement('a');
      link.href = collection.pdf_file;
      link.download = `${collection.collection_name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // TODO: Generate PDF
      toast.info("PDF generation will be implemented soon");
    }
  };

  const handleDeleteCollection = (collection: InvoiceCollection) => {
    if (collection.status !== 'draft') {
      toast.error("Only draft collections can be deleted");
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${collection.collection_name}"?`)) {
      deleteCollection(collection.id);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'generated':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoice Collections</h1>
              <p className="text-gray-600 mt-1">
                Manage your invoice collections and generated PDF documents
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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
                <option value="generated">Generated</option>
                <option value="sent">Sent</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Collections Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collection Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoices
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {collections.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No collections found
                    </td>
                  </tr>
                ) : (
                  collections.map((collection: InvoiceCollection) => (
                    <tr key={collection.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {collection.collection_name}
                          </div>
                          {collection.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {collection.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{collection.total_invoices}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          KSh {(collection.total_amount || 0).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(collection.status)}`}>
                          {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(collection.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(collection.created_at).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {collection.created_by_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="View Collection"
                            onClick={() => handleViewCollection(collection)}
                          >
                            <FiEye size={16} />
                          </button>
                          {collection.pdf_file && (
                            <button
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Download PDF"
                              onClick={() => handleDownloadPDF(collection)}
                            >
                              <FiDownload size={16} />
                            </button>
                          )}
                          {collection.status === 'draft' && (
                            <button
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete Collection"
                              onClick={() => handleDeleteCollection(collection)}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCollections;
