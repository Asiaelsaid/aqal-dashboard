import React from "react";
import { FiX, FiDownload } from "react-icons/fi";
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

interface ViewReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: Receipt | null;
}

const ViewReceiptModal: React.FC<ViewReceiptModalProps> = ({ isOpen, onClose, receipt }) => {
  if (!isOpen || !receipt) return null;

  const handleDownload = () => {
    if (receipt) {
      generateReceiptPDF(receipt);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Receipt Details</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                title="Download Receipt"
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

          {/* Receipt Content */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            {/* Receipt Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">RECEIPT</h1>
              <p className="text-lg text-gray-600">{receipt.receipt_number}</p>
            </div>

            {/* Receipt Type Badge */}
            <div className="flex justify-center mb-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                receipt.receipt_type === 'IBD' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {receipt.receipt_type_display}
              </span>
            </div>

            {/* Main Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {receipt.receipt_type === 'IBD' ? 'Received From' : 'Paid To'}
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {receipt.receipt_type === 'IBD' ? receipt.received_from : receipt.paid_to}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Date
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(receipt.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Amount
                </h3>
                <p className={`text-2xl font-bold ${
                  receipt.receipt_type === 'IBD' ? 'text-green-600' : 'text-red-600'
                }`}>
                  KSh {receipt.amount.toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Payment Method
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {receipt.payment_method_display}
                </p>
              </div>
            </div>

            {/* Property and Unit Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Property
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {receipt.property_name}
                </p>
              </div>

              {receipt.unit_number && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Unit
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {receipt.unit_number}
                  </p>
                </div>
              )}
            </div>

            {/* Purpose */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Purpose
              </h3>
              <p className="text-lg text-gray-900">
                {receipt.purpose}
              </p>
            </div>

            {/* Description */}
            {receipt.description && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-gray-900">
                  {receipt.description}
                </p>
              </div>
            )}

            {/* Payment Reference */}
            {receipt.payment_reference && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Payment Reference
                </h3>
                <p className="text-gray-900 font-mono">
                  {receipt.payment_reference}
                </p>
              </div>
            )}

            {/* Contact Information */}
            {(receipt.contact_phone || receipt.contact_address) && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Contact Information
                </h3>
                {receipt.contact_phone && (
                  <p className="text-gray-900">Phone: {receipt.contact_phone}</p>
                )}
                {receipt.contact_address && (
                  <p className="text-gray-900">Address: {receipt.contact_address}</p>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-500">
                <div>
                  <p>Created by: {receipt.created_by_name}</p>
                  <p>Created: {new Date(receipt.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p>Last updated: {new Date(receipt.updated_at).toLocaleString()}</p>
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

export default ViewReceiptModal;
