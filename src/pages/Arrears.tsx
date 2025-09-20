import { useState, useMemo } from "react";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import { FaExclamationTriangle, FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import useCustomQuery from "@hooks/useCustomQuery";
import { formatShortDate } from "@utils/dateUtils";

interface ArrearsItem {
  id: number;
  tenant_id: number;
  tenant_name: string;
  tenant_email: string;
  tenant_phone: string;
  property_name: string;
  unit_number: string;
  unit_level: string;
  payment_reference: string;
  month: string;
  amount_due: string;
  amount_paid: string;
  outstanding_amount: string;
  due_date: string;
  days_overdue: number;
  status: string;
  payment_date: string | null;
}

interface ArrearsStats {
  total_arrears_amount: string;
  overdue_cases: number;
  avg_days_overdue: number;
}

const Arrears = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch arrears statistics
  const { data: statsData, isLoading: statsLoading } = useCustomQuery({
    queryKey: ["arrears-stats"],
    url: "/tenants/arrears/stats/",
  });

  // Fetch arrears list with search and filter
  const queryParams = new URLSearchParams();
  if (searchTerm.trim()) queryParams.append('search', searchTerm.trim());
  if (filterStatus !== 'all') queryParams.append('status', filterStatus);

  const { data: arrearsData, isLoading: arrearsLoading } = useCustomQuery({
    queryKey: ["arrears-list", searchTerm, filterStatus],
    url: `/tenants/arrears/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
  });

  const stats: ArrearsStats = statsData?.data || {
    total_arrears_amount: "0.00",
    overdue_cases: 0,
    avg_days_overdue: 0
  };

  const arrearsList: ArrearsItem[] = arrearsData?.data || [];

  // Filter arrears based on search term and status locally for real-time feedback
  const filteredArrears = useMemo(() => {
    return arrearsList.filter(item => {
      const matchesSearch = !searchTerm.trim() || 
        item.tenant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tenant_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.payment_reference.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'overdue' && item.status === 'overdue');

      return matchesSearch && matchesStatus;
    });
  }, [arrearsList, searchTerm, filterStatus]);

  const formatCurrency = (amount: string) => {
    return `KSh ${parseFloat(amount).toLocaleString()}`;
  };

  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Arrears Management" />
      <SubHeading subHeading="Track and manage overdue payments and debt collection" />
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search arrears..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="overdue">Overdue</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
            <FaDownload />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Arrears</p>
              <p className="text-2xl font-bold text-red-600">
                {statsLoading ? "Loading..." : formatCurrency(stats.total_arrears_amount)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FaExclamationTriangle className="text-orange-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue Cases</p>
              <p className="text-2xl font-bold text-orange-600">
                {statsLoading ? "..." : stats.overdue_cases}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaExclamationTriangle className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Days Overdue</p>
              <p className="text-2xl font-bold text-green-600">
                {statsLoading ? "..." : `${stats.avg_days_overdue} days`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Arrears Overview</h3>
            <div className="text-sm text-gray-600">
              {filteredArrears.length} records found
            </div>
          </div>
          
          {arrearsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading arrears data...</p>
            </div>
          ) : filteredArrears.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-4">
                <FaExclamationTriangle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Arrears Found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || filterStatus !== 'all' 
                  ? "No arrears match your current search or filter criteria."
                  : "Great! All tenants are up to date with their payments."
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property/Unit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount Due
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Outstanding
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Overdue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredArrears.map((arrears) => (
                    <tr key={arrears.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {arrears.tenant_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {arrears.tenant_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {arrears.tenant_email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{arrears.property_name}</div>
                        <div className="text-sm text-gray-500">Unit {arrears.unit_number}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{arrears.month}</div>
                        <div className="text-sm text-gray-500">
                          Due: {formatShortDate(arrears.due_date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(arrears.amount_due)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-red-600">
                          {formatCurrency(arrears.outstanding_amount)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Paid: {formatCurrency(arrears.amount_paid)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          arrears.days_overdue > 30 ? 'bg-red-100 text-red-800' :
                          arrears.days_overdue > 14 ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {arrears.days_overdue} days
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Overdue
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Arrears;