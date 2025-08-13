import React, { useState } from "react";
import { FiEye, FiTrash2, FiDownload, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import useAxios from "@config/axios.config";
import { useMutation } from "@tanstack/react-query";
import ViewInvoiceModal from "./ViewInvoiceModal";
import { Invoice } from "@interfaces/index";

interface InvoicesTableProps {
  data: Invoice[];
  isLoading: boolean;
  refetch: () => void;
  selectedInvoices?: number[];
  onInvoiceSelection?: (invoiceId: number, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  showSelection?: boolean;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ 
  data, 
  isLoading, 
  refetch, 
  selectedInvoices = [], 
  onInvoiceSelection, 
  onSelectAll, 
  showSelection = false 
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const axiosInstance = useAxios();

  const { mutate: performAction } = useMutation({
    mutationFn: async ({ url, method, data }: { url: string; method: string; data?: any }) => {
      const response = await axiosInstance.request({
        method,
        url,
        data, // Only send the data part to the backend
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      refetch();
      // Show appropriate success message based on the action
      if (variables.method === 'DELETE') {
        toast.success("Invoice deleted successfully!");
      } else if (variables.data?.status === 'sent') {
        toast.success("Invoice sent successfully!");
      } else {
        toast.success("Invoice updated successfully!");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Action failed");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Create a printable invoice directly without opening a new window
    const printableContent = `
      <html>
        <head>
          <title>Invoice ${invoice.invoice_number}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6;
            }
            .invoice-header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .invoice-details { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 30px; 
              margin: 30px 0; 
            }
            .section { 
              margin: 20px 0; 
            }
            .section h3 { 
              color: #333; 
              border-bottom: 1px solid #ccc; 
              padding-bottom: 5px;
              margin-bottom: 10px;
            }
            .financial-summary { 
              background: #f9f9f9; 
              padding: 20px; 
              border-radius: 5px; 
              margin-top: 30px;
            }
            .total-amount { 
              font-size: 1.2em; 
              font-weight: bold; 
              color: #2563eb;
            }
            .status-badge {
              display: inline-block;
              padding: 5px 10px;
              border-radius: 15px;
              font-size: 0.9em;
              font-weight: bold;
              ${invoice.status === 'paid' ? 'background: #d1fae5; color: #059669;' : 
                invoice.status === 'sent' ? 'background: #dbeafe; color: #2563eb;' : 
                invoice.status === 'overdue' ? 'background: #fee2e2; color: #dc2626;' : 
                'background: #f3f4f6; color: #374151;'}
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <h1>INVOICE</h1>
            <h2>${invoice.invoice_number}</h2>
            <div class="status-badge">${invoice.status.toUpperCase()}</div>
          </div>
          
          <div class="invoice-details">
            <div class="section">
              <h3>Bill To</h3>
              <p><strong>${invoice.bill_to_name}</strong></p>
              ${invoice.bill_to_email ? `<p>${invoice.bill_to_email}</p>` : ''}
              ${invoice.bill_to_phone ? `<p>${invoice.bill_to_phone}</p>` : ''}
              <p>${invoice.bill_to_address}</p>
            </div>
            
            <div class="section">
              <h3>Invoice Details</h3>
              <p><strong>Issue Date:</strong> ${new Date(invoice.issue_date).toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> ${new Date(invoice.due_date).toLocaleDateString()}</p>
              <p><strong>Property:</strong> ${invoice.property_name}</p>
              <p><strong>Type:</strong> ${invoice.invoice_type_display || invoice.invoice_type}</p>
            </div>
          </div>
          
          <div class="section">
            <h3>Service Details</h3>
            <p><strong>Title:</strong> ${invoice.title}</p>
            ${invoice.description ? `<p><strong>Description:</strong> ${invoice.description}</p>` : ''}
          </div>
          
          <div class="financial-summary">
            <h3>Financial Summary</h3>
            <p><strong>Subtotal:</strong> KSh ${(invoice.subtotal || 0).toLocaleString()}</p>
            <p><strong>Tax Rate:</strong> ${(invoice.tax_rate || 0)}%</p>
            <p><strong>Tax Amount:</strong> KSh ${(invoice.tax_amount || 0).toLocaleString()}</p>
            <div class="total-amount">
              <p><strong>Total Amount:</strong> KSh ${(invoice.total_amount || 0).toLocaleString()}</p>
            </div>
          </div>
          
          ${invoice.notes ? `
            <div class="section">
              <h3>Notes</h3>
              <p>${invoice.notes}</p>
            </div>
          ` : ''}
          
          <div class="section" style="margin-top: 40px; text-align: center; color: #666;">
            <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printableContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
      toast.success("Invoice downloaded successfully!");
    } else {
      toast.error("Please enable popups to download invoices, or view the invoice and use the download button");
    }
  };

  const handleSendInvoice = (invoice: Invoice) => {
    if (invoice.status === 'draft') {
      performAction({
        url: `tenants/invoices/${invoice.id}/`,
        method: "PUT",
        data: { status: 'sent' }
      });
    } else {
      toast.info("Invoice has already been sent");
    }
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      performAction({
        url: `tenants/invoices/${invoice.id}/`,
        method: "DELETE",
      });
    }
  };

  const getStatusBadge = (status: string, isOverdue: boolean) => {
    if (isOverdue && status === 'sent') {
      return 'bg-red-100 text-red-800';
    }
    
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string, isOverdue: boolean) => {
    if (isOverdue && status === 'sent') {
      return 'Overdue';
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {showSelection && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedInvoices.length === data.length && data.length > 0}
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice No.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bill To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Issue Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={showSelection ? 10 : 9} className="px-6 py-4 text-center text-gray-500">
                No invoices found
              </td>
            </tr>
          ) : (
            data.map((invoice, index) => (
              <tr key={invoice.id || index} className="hover:bg-gray-50">
                {showSelection && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={(e) => onInvoiceSelection?.(invoice.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">
                    {invoice.invoice_number || `INV-${index + 1}`}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {invoice.invoice_type_display || invoice.invoice_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.property_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {invoice.property}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.bill_to_name}
                    </div>
                    {invoice.bill_to_email && (
                      <div className="text-sm text-gray-500">
                        {invoice.bill_to_email}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      KSh {(invoice.total_amount || 0).toLocaleString()}
                    </div>
                    {(invoice.tax_amount || 0) > 0 && (
                      <div className="text-xs text-gray-500">
                        Tax: KSh {(invoice.tax_amount || 0).toLocaleString()}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-600">
                    {new Date(invoice.issue_date).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-600">
                    {new Date(invoice.due_date).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(invoice.status, invoice.is_overdue)}`}>
                    {getStatusText(invoice.status, invoice.is_overdue)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="View Invoice"
                      onClick={() => handleViewInvoice(invoice)}
                    >
                      <FiEye size={16} />
                    </button>
                    {invoice.status === 'draft' && (
                      <button
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Send Invoice"
                        onClick={() => handleSendInvoice(invoice)}
                      >
                        <FiSend size={16} />
                      </button>
                    )}
                    <button
                      className="text-purple-600 hover:text-purple-800 p-1"
                      title="Download Invoice"
                      onClick={() => handleDownloadInvoice(invoice)}
                    >
                      <FiDownload size={16} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete Invoice"
                      onClick={() => handleDeleteInvoice(invoice)}
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

      <ViewInvoiceModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        invoice={selectedInvoice}
        refetch={refetch}
      />
    </div>
  );
};

export default InvoicesTable;
