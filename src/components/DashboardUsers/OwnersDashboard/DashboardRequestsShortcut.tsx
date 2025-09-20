import React from "react";
import { BsDot } from "react-icons/bs";
import { FiClock, FiAlertTriangle, FiCheckCircle, FiFileText } from "react-icons/fi";
import useCustomQuery from "@hooks/useCustomQuery";
import { useNavigate } from "react-router-dom";
import { formatRelativeTime, formatShortDate } from "@utils/dateUtils";

interface Request {
  id: number;
  req_code: string;
  category: string;
  description: string;
  status: string;
  urgency: string;
  preferred_service_date: string;
  created_at: string;
  updated_at: string;
  receipt_attachment?: string;
  property_name?: string;
  unit_number?: string;
  tenant_name?: string;
}

const DashboardRequestsShortcut: React.FC = () => {
  const navigate = useNavigate();
  
  const { data } = useCustomQuery({
    queryKey: ["dashboard-requests"],
    url: "/managers/properties-requests",
  });

  const allRequests: Request[] = data?.data?.flatMap((property: any) =>
    property.units?.flatMap((unit: any) =>
      unit.requests?.map((request: any) => ({
        ...request,
        property_name: property.name,
        unit_number: unit.unit_number,
        tenant_name: unit.tenant?.name,
      }))
    ) || []
  ) || [];

  // Sort requests by creation date (newest first) and take the most recent 5
  const recentRequests = allRequests
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const getRequestStatusColor = (request: Request): string => {
    const now = new Date();
    const createdAt = new Date(request.created_at);
    const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

    // If request is completed, show green
    if (request.status === "completed") {
      return "bg-green-100 text-green-700 border-green-200";
    }

    // If request is cancelled, show gray
    if (request.status === "cancelled") {
      return "bg-gray-100 text-gray-700 border-gray-200";
    }

    // If request is in progress, show orange
    if (request.status === "in_progress") {
      return "bg-orange-100 text-orange-700 border-orange-200";
    }

    // For pending requests, color based on time elapsed
    if (daysSinceCreation >= 2) {
      return "bg-red-100 text-red-700 border-red-200"; // Red - Past due date
    } else if (daysSinceCreation >= 1) {
      return "bg-yellow-100 text-yellow-700 border-yellow-200"; // Yellow - Urgent
    } else {
      return "bg-blue-100 text-blue-700 border-blue-200"; // Blue - New
    }
  };

  const getRequestStatusText = (request: Request): string => {
    const now = new Date();
    const createdAt = new Date(request.created_at);
    const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

    if (request.status === "completed") {
      return "Completed";
    }
    if (request.status === "cancelled") {
      return "Cancelled";
    }
    if (request.status === "in_progress") {
      return "In Progress";
    }

    // For pending requests
    if (daysSinceCreation >= 2) {
      return "Past Due Date";
    } else if (daysSinceCreation >= 1) {
      return "Urgent";
    } else {
      return "New";
    }
  };

  const getRequestStatusIcon = (request: Request) => {
    const now = new Date();
    const createdAt = new Date(request.created_at);
    const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

    if (request.status === "completed") {
      return <FiCheckCircle className="text-green-600" />;
    }
    if (request.status === "cancelled") {
      return <BsDot className="text-gray-600 text-xl" />;
    }
    if (request.status === "in_progress") {
      return <FiClock className="text-orange-600" />;
    }

    // For pending requests
    if (daysSinceCreation >= 2) {
      return <FiAlertTriangle className="text-red-600" />;
    } else if (daysSinceCreation >= 1) {
      return <FiAlertTriangle className="text-yellow-600" />;
    } else {
      return <BsDot className="text-blue-600 text-xl" />;
    }
  };

  // Using the utility function for consistent date formatting

  const handleViewAllRequests = () => {
    navigate("/dashboard/requests");
  };

  if (recentRequests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Requests</h3>
          <button
            onClick={handleViewAllRequests}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All
          </button>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <p className="text-gray-500">No requests found</p>
          <p className="text-sm text-gray-400 mt-1">All caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Requests</h3>
        <button
          onClick={handleViewAllRequests}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {recentRequests.map((request) => (
          <div
            key={request.id}
            className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate("/dashboard/requests")}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                                 <div className="flex items-center gap-2 mb-1">
                   {getRequestStatusIcon(request)}
                   <span className="text-sm font-medium text-gray-900">
                     {request.req_code}
                   </span>
                   <span
                     className={`px-2 py-1 text-xs font-medium rounded-full border ${getRequestStatusColor(
                       request
                     )}`}
                   >
                     {getRequestStatusText(request)}
                   </span>
                   {request.status === "completed" && (
                     <span className="flex items-center gap-1 text-xs">
                       {request.receipt_attachment ? (
                         <FiFileText className="text-green-600" title="Receipt uploaded" />
                       ) : (
                         <span className="text-orange-500" title="No receipt uploaded">📄</span>
                       )}
                     </span>
                   )}
                 </div>
                
                <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                  {request.description}
                </p>
                
                                 <div className="flex items-center gap-4 text-xs text-gray-500">
                   {request.property_name && (
                     <span>🏢 {request.property_name}</span>
                   )}
                   {request.unit_number && (
                     <span>🏠 Unit {request.unit_number}</span>
                   )}
                   {request.tenant_name && (
                     <span>👤 {request.tenant_name}</span>
                   )}
                   <span title="Created">📅 {formatRelativeTime(request.created_at)}</span>
                   <span title="Preferred Service Date">📋 {formatShortDate(request.preferred_service_date)}</span>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {allRequests.length > 5 && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500 text-center">
            Showing 5 of {allRequests.length} requests
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardRequestsShortcut;
