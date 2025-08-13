import React, { useState } from 'react';
import { BsCreditCard, BsFileText, BsSearch } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import useCustomQuery from '@hooks/useCustomQuery';

const ManagerPayments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'payments' | 'receipts'>('payments');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('all');

  const { data: paymentData, isLoading: loading, error, refetch } = useCustomQuery({
    queryKey: ['manager-payments'],
    url: 'tenants/payments/manager/',
  });

  const payments = paymentData?.data?.payments || [];
  const receipts = paymentData?.data?.receipts || [];
  const summary = paymentData?.data?.summary || {
    total_payments: 0,
    total_receipts: 0,
    paid_payments: 0,
    pending_payments: 0,
    overdue_payments: 0,
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentMethodBadge = (method: string) => {
    const styles = {
      cash: 'bg-blue-100 text-blue-800',
      mpesa: 'bg-green-100 text-green-800',
      cheque: 'bg-purple-100 text-purple-800',
      card: 'bg-indigo-100 text-indigo-800',
      bank_transfer: 'bg-teal-100 text-teal-800'
    };
    return styles[method as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const filteredPayments = payments.filter((payment: any) => {
    const matchesSearch = 
      payment.tenant.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.tenant.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.unit.property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.payment_reference?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredReceipts = receipts.filter((receipt: any) => {
    const matchesSearch = 
      receipt.received_from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.receipt_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.property?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.unit?.unit_number.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPaymentMethod = paymentMethodFilter === 'all' || receipt.payment_method === paymentMethodFilter;

    return matchesSearch && matchesPaymentMethod;
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <BsFileText className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
              <p className="text-gray-500 mb-4">{error?.message || 'An error occurred'}</p>
              <button
                onClick={() => refetch()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Payment Management</h1>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FiDownload className="w-4 h-4 mr-2" />
              Export Data
            </button>
          </div>

          {/* Summary Cards */}
          {paymentData && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600">Total Payments</h3>
                <p className="text-2xl font-bold text-blue-900">{summary.total_payments}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600">Paid</h3>
                <p className="text-2xl font-bold text-green-900">{summary.paid_payments}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-600">Pending</h3>
                <p className="text-2xl font-bold text-yellow-900">{summary.pending_payments}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-red-600">Overdue</h3>
                <p className="text-2xl font-bold text-red-900">{summary.overdue_payments}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600">Total Receipts</h3>
                <p className="text-2xl font-bold text-purple-900">{summary.total_receipts}</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === 'payments'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Gateway Payments
            </button>
            <button
              onClick={() => setActiveTab('receipts')}
              className={`px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === 'receipts'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Cash Receipts
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by tenant, property, unit, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {activeTab === 'payments' ? (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            ) : (
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Methods</option>
                <option value="cash">Cash</option>
                <option value="mpesa">M-Pesa</option>
                <option value="cheque">Cheque</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'payments' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property & Unit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment: any) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.payment_reference}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.transaction_id && `TX: ${payment.transaction_id}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            Month: {payment.month}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.tenant.first_name} {payment.tenant.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.tenant.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.tenant.phone_number}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.unit.property.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Unit {payment.unit.unit_number} - Level {payment.unit.unit_level}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Due: KES {payment.amount_due.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            Paid: KES {payment.amount_paid.toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div>Due: {new Date(payment.due_date).toLocaleDateString()}</div>
                          {payment.payment_date && (
                            <div>Paid: {new Date(payment.payment_date).toLocaleDateString()}</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPayments.length === 0 && (
                <div className="text-center py-12">
                  <BsCreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Payments Found</h3>
                  <p className="text-gray-500">No payments match your current filters.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receipt Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property & Unit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReceipts.map((receipt: any) => (
                    <tr key={receipt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {receipt.receipt_number}
                          </div>
                          <div className="text-sm text-gray-500">
                            Type: {receipt.receipt_type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {receipt.received_from || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {receipt.payment_reference && `Ref: ${receipt.payment_reference}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {receipt.property?.name || receipt.unit?.property?.name || 'N/A'}
                          </div>
                          {receipt.unit && (
                            <div className="text-sm text-gray-500">
                              Unit {receipt.unit.unit_number} - Level {receipt.unit.unit_level}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          KES {receipt.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodBadge(receipt.payment_method)}`}>
                          {receipt.payment_method.charAt(0).toUpperCase() + receipt.payment_method.slice(1).replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(receipt.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredReceipts.length === 0 && (
                <div className="text-center py-12">
                  <BsFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Receipts Found</h3>
                  <p className="text-gray-500">No receipts match your current filters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerPayments;
