import React, { useState } from "react";
import { FiDownload, FiEye, FiTrash2, FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";
import useAxios from "@config/axios.config";
import ViewReceiptModal from "./ViewReceiptModal";
import EditReceiptModal from "./EditReceiptModal";
import { generateReceiptPDF } from "@utils/pdfUtils";

interface Receipt {
  id: string;
  receipt_number: string;
  receipt_type: 'IBD' | 'OBD';
  receipt_type_display: string;
  date: string;
  amount: number;
  payment_method: string;
  payment_method_display: string;
  payment_reference?: string;
  property: number;
  property_name: string;
  unit?: number;
  unit_number?: string;
  received_from?: string;
  paid_to?: string;
  purpose: string;
  description?: string;
  contact_phone?: string;
  contact_address?: string;
  created_by: number;
  created_by_name: string;
  created_at: string;
  updated_at: string;
}

interface ReceiptsTableProps {
  data: Receipt[];
  isLoading: boolean;
  refetch: () => void;
}

const ReceiptsTable: React.FC<ReceiptsTableProps> = ({ data, isLoading, refetch }) => {
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const axiosInstance = useAxios();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleViewReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setIsViewModalOpen(true);
  };

  const handleEditReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setIsEditModalOpen(true);
  };

  const handleDownloadReceipt = (receipt: Receipt) => {
    generateReceiptPDF(receipt);
  };

  const handleDeleteReceipt = async (receipt: Receipt) => {
    const confirmMessage = `Are you sure you want to delete receipt ${receipt.receipt_number}?\n\nThis will also update any related payment amounts. This action cannot be undone.`;
    
    if (window.confirm(confirmMessage)) {
      try {
        const response = await axiosInstance.delete(`tenants/receipts/${receipt.id}/`);
        const data = response.data;
        const message = data?.message || "Receipt deleted successfully!";
        const paymentUpdated = data?.data?.payment_updated;
        
        toast.success(
          paymentUpdated 
            ? `${message} Related payment has been updated.`
            : message
        );
        refetch();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to delete receipt");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Receipt No.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              From/To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Purpose
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                No receipts found
              </td>
            </tr>
          ) : (
            data.map((receipt, index) => (
              <tr key={receipt.id || index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">
                    {receipt.receipt_number || `REC-${index + 1}`}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    receipt.receipt_type === 'IBD' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {receipt.receipt_type_display || receipt.receipt_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {receipt.property_name}
                    </div>
                    {receipt.unit_number && (
                      <div className="text-sm text-gray-500">
                        Unit: {receipt.unit_number}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-700">
                    {receipt.receipt_type === 'IBD' ? receipt.received_from : receipt.paid_to}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-semibold ${
                    receipt.receipt_type === 'IBD' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    KSh {receipt.amount?.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-600">
                    {new Date(receipt.date).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {receipt.payment_method_display || receipt.payment_method}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600 max-w-xs truncate block">
                    {receipt.purpose}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="View Receipt"
                      onClick={() => handleViewReceipt(receipt)}
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-800 p-1"
                      title="Edit Receipt"
                      onClick={() => handleEditReceipt(receipt)}
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Download Receipt"
                      onClick={() => handleDownloadReceipt(receipt)}
                    >
                      <FiDownload size={16} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete Receipt"
                      onClick={() => handleDeleteReceipt(receipt)}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ViewReceiptModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        receipt={selectedReceipt}
      />

      <EditReceiptModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        receipt={selectedReceipt}
        refetch={refetch}
      />
    </div>
  );
};

export default ReceiptsTable;