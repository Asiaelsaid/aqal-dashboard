import React from "react";
import { FiX, FiDownload, FiPrinter, FiSend, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import useAxios from "@config/axios.config";
import { useMutation } from "@tanstack/react-query";
import { Invoice } from "@interfaces/index";

interface ViewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  refetch: () => void;
}

const ViewInvoiceModal: React.FC<ViewInvoiceModalProps> = ({ isOpen, onClose, invoice, refetch }) => {
  const axiosInstance = useAxios();

  const { mutate: performAction } = useMutation({
    mutationFn: async ({ url, method, data }: { url: string; method: string; data?: any }) => {
      const response = await axiosInstance.request({
        method,
        url,
        data,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      refetch();
      onClose();
      // Show appropriate success message based on the action
      if (variables.data?.status === 'sent') {
        toast.success("Invoice sent successfully!");
      } else if (variables.data?.status === 'paid') {
        toast.success("Invoice marked as paid!");
      } else {
        toast.success("Invoice updated successfully!");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update invoice");
    },
  });

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a comprehensive printable version and download as PDF
    const printContent = document.querySelector('.invoice-content');
    if (printContent) {
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
                  invoice.status === 'overdue' || invoice.is_overdue ? 'background: #fee2e2; color: #dc2626;' : 
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
              <div class="status-badge">${getStatusText(invoice.status, invoice.is_overdue).toUpperCase()}</div>
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
                <p><strong>Issue Date:</strong> ${new Date(invoice.issue_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p><strong>Due Date:</strong> ${new Date(invoice.due_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
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
            
            ${invoice.created_by_name ? `
              <div class="section">
                <h3>Invoice Information</h3>
                <p><strong>Created by:</strong> ${invoice.created_by_name}</p>
                <p><strong>Created on:</strong> ${new Date(invoice.created_at).toLocaleDateString()}</p>
                ${invoice.updated_at !== invoice.created_at ? `<p><strong>Last updated:</strong> ${new Date(invoice.updated_at).toLocaleDateString()}</p>` : ''}
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
        toast.error("Could not generate invoice for download. Please enable popups.");
      }
    } else {
      toast.error("Could not generate invoice for download");
    }
  };

  const handleSendInvoice = () => {
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

  const handleMarkAsPaid = () => {
    if (invoice.status !== 'paid') {
      const paymentData = {
        status: 'paid',
        paid_date: new Date().toISOString().split('T')[0],
        payment_method: 'manual', // You could add a form to collect this
      };
      
      performAction({
        url: `tenants/invoices/${invoice.id}/`,
        method: "PUT",
        data: paymentData
      });
    } else {
      toast.info("Invoice is already marked as paid");
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Invoice Details</h2>
            <div className="flex items-center gap-2">
              {invoice.status === 'draft' && (
                <button
                  onClick={handleSendInvoice}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                  title="Send Invoice"
                >
                  <FiSend size={20} />
                </button>
              )}
              {invoice.status !== 'paid' && (
                <button
                  onClick={handleMarkAsPaid}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  title="Mark as Paid"
                >
                  Mark Paid
                </button>
              )}
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Print Invoice"
              >
                <FiPrinter size={20} />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                title="Download Invoice"
              >
                <FiDownload size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Close"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white invoice-content">
            {/* Invoice Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
              <p className="text-lg text-gray-600">{invoice.invoice_number}</p>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center mb-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusBadge(invoice.status, invoice.is_overdue)}`}>
                {getStatusText(invoice.status, invoice.is_overdue)}
              </span>
            </div>

            {/* Main Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Bill To
                </h3>
                <div className="text-lg text-gray-900">
                  <p className="font-semibold">{invoice.bill_to_name}</p>
                  {invoice.bill_to_email && <p>{invoice.bill_to_email}</p>}
                  {invoice.bill_to_phone && <p>{invoice.bill_to_phone}</p>}
                  <p className="whitespace-pre-line">{invoice.bill_to_address}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Issue Date
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {invoice.issue_date ? new Date(invoice.issue_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Unknown'}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Due Date
                  </h3>
                  <p className={`text-lg font-semibold ${
                    invoice.is_overdue ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Property
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {invoice.property_name || `Property ID: ${invoice.property}`}
              </p>
            </div>

            {/* Invoice Title and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Invoice Title
                </h3>
                <p className="text-lg text-gray-900">
                  {invoice.title || 'No title'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Type
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {invoice.invoice_type_display || invoice.invoice_type}
                </span>
              </div>
            </div>

            {/* Description */}
            {invoice.description && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-gray-900 whitespace-pre-line">
                  {invoice.description}
                </p>
              </div>
            )}

            {/* Financial Breakdown */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Details</h3>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">KSh {(invoice.subtotal || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({invoice.tax_rate || 0}%):</span>
                    <span className="font-medium">KSh {(invoice.tax_amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                      <span className="text-lg font-bold text-gray-900">KSh {(invoice.total_amount || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Notes
                </h3>
                <p className="text-gray-900 whitespace-pre-line">
                  {invoice.notes}
                </p>
              </div>
            )}

            {/* Payment Information */}
            {invoice.status === 'paid' && (
              <div className="mb-6 bg-green-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-green-800 uppercase tracking-wider mb-2">
                  Payment Information
                </h3>
                <div className="text-green-900">
                  {invoice.paid_date && (
                    <p>Paid on: {new Date(invoice.paid_date).toLocaleDateString()}</p>
                  )}
                  {invoice.payment_method && (
                    <p>Method: {invoice.payment_method}</p>
                  )}
                  {invoice.payment_reference && (
                    <p>Reference: {invoice.payment_reference}</p>
                  )}
                </div>
              </div>
            )}

            {/* Attachment */}
            {invoice.attachment && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Attachment
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {invoice.attachment.toLowerCase().includes('.pdf') ? (
                          <span className="text-red-600 text-2xl">📄</span>
                        ) : invoice.attachment.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) ? (
                          <span className="text-blue-600 text-2xl">🖼️</span>
                        ) : (
                          <span className="text-gray-600 text-2xl">📎</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {invoice.attachment.split('/').pop() || 'Attachment'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click to view or download
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={invoice.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                      >
                        <FiEye className="mr-1" size={14} />
                        View
                      </a>
                      <a
                        href={invoice.attachment}
                        download
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                      >
                        <FiDownload className="mr-1" size={14} />
                        Download
                      </a>
                    </div>
                  </div>
                  
                  {/* Preview for images */}
                  {invoice.attachment.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) && (
                    <div className="mt-4">
                      <img
                        src={invoice.attachment}
                        alt="Invoice attachment"
                        className="max-w-full h-auto max-h-64 object-contain border border-gray-200 rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-500">
                <div>
                  <p>Created by: {invoice.created_by_name || 'Unknown'}</p>
                  <p>Created: {invoice.created_at ? new Date(invoice.created_at).toLocaleString() : 'Unknown'}</p>
                </div>
                <div>
                  <p>Last updated: {invoice.updated_at ? new Date(invoice.updated_at).toLocaleString() : 'Unknown'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;
