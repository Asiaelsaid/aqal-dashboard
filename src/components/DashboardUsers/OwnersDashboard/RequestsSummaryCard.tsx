import React from "react";
import { BsDot } from "react-icons/bs";
import { FiAlertTriangle, FiCheckCircle, FiClock } from "react-icons/fi";
import useCustomQuery from "@hooks/useCustomQuery";
import { useNavigate } from "react-router-dom";

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
}

const RequestsSummaryCard: React.FC = () => {
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

  const getRequestStats = () => {
    const now = new Date();
    let newRequests = 0;
    let urgentRequests = 0;
    let overdueRequests = 0;
    let completedRequests = 0;
    let inProgressRequests = 0;

    allRequests.forEach((request) => {
      if (request.status === "completed") {
        completedRequests++;
      } else if (request.status === "in_progress") {
        inProgressRequests++;
      } else if (request.status === "pending") {
        const createdAt = new Date(request.created_at);
        const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysSinceCreation >= 2) {
          overdueRequests++;
        } else if (daysSinceCreation >= 1) {
          urgentRequests++;
        } else {
          newRequests++;
        }
      }
    });

    return {
      new: newRequests,
      urgent: urgentRequests,
      overdue: overdueRequests,
      completed: completedRequests,
      inProgress: inProgressRequests,
      total: allRequests.length
    };
  };

  const stats = getRequestStats();

  const handleViewRequests = () => {
    navigate("/dashboard/requests");
  };

  return (
    <div 
      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleViewRequests}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Requests</h3>
        <span className="text-2xl">📋</span>
      </div>
      
      <div className="space-y-2">
        {/* New Requests */}
        {stats.new > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BsDot className="text-blue-600 text-xl" />
              <span className="text-sm text-gray-600">New</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">{stats.new}</span>
          </div>
        )}
        
        {/* Urgent Requests */}
        {stats.urgent > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiAlertTriangle className="text-yellow-600" />
              <span className="text-sm text-gray-600">Urgent</span>
            </div>
            <span className="text-sm font-semibold text-yellow-600">{stats.urgent}</span>
          </div>
        )}
        
        {/* Overdue Requests */}
        {stats.overdue > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiAlertTriangle className="text-red-600" />
              <span className="text-sm text-gray-600">Overdue</span>
            </div>
            <span className="text-sm font-semibold text-red-600">{stats.overdue}</span>
          </div>
        )}
        
        {/* In Progress Requests */}
        {stats.inProgress > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiClock className="text-orange-600" />
              <span className="text-sm text-gray-600">In Progress</span>
            </div>
            <span className="text-sm font-semibold text-orange-600">{stats.inProgress}</span>
          </div>
        )}
        
        {/* Completed Requests */}
        {stats.completed > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-green-600" />
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <span className="text-sm font-semibold text-green-600">{stats.completed}</span>
          </div>
        )}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total Requests</span>
          <span className="text-sm font-semibold text-gray-800">{stats.total}</span>
        </div>
      </div>
      
      <div className="mt-3">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Requests →
        </button>
      </div>
    </div>
  );
};

export default RequestsSummaryCard;
