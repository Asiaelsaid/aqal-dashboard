import useAxios from "@config/axios.config";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsDot } from "react-icons/bs";
import { FaArrowDown, FaEllipsisVertical } from "react-icons/fa6";

interface Request {
  req_code: string;
  category: string;
  description: string;
  status: string;
  urgency: string;
  preferred_service_date: string;
}
interface RequestsTableProps {
  requests: Request[];
}
const RequestsTable: React.FC<RequestsTableProps> = ({ requests }) => {
  const axiosInstance = useAxios();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];
  const getStatusStyles = (status: string): string => {
    switch (status) {
      case "Solved":
        return "bg-green-100 text-green-700";
      case "In progress":
        return "bg-orange-100 text-orange-700";
      case "Received":
        return "bg-gray-100 text-gray-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-500"; // Default case
    }
  };
  const capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  const updateRequestStatus = async (status: string) => {
    try {
      const { data } = await axiosInstance.post(
        `/tenants/requests/1/update-status/`,
        {
          status,
        }
      );
      if (data.status === 200) {
        toast.success("Request status updated successfully!");
        console.log("Status updated successfully:");
      }
    } catch (error) {
      toast.error("Failed to update request status.");
      console.error("Error updating status:", error);
    }
  };
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-500 bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left flex items-center">
                Date
                <FaArrowDown className="ml-1" />{" "}
              </th>
              <th className="px-6 py-3 border-b text-left">Request ID</th>
              <th className="px-6 py-3 border-b text-left">Service type</th>
              <th className="px-6 py-3 border-b text-left">Description</th>
              <th className="px-6 py-3 border-b text-left">Status</th>
              <th className="px-6 py-3 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.req_code}>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {request.preferred_service_date}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {request.req_code}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {request.category}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {request.description}
                </td>

                <td className="px-6 py-4 border-b  text-left  ">
                  <span
                    className={`pr-3 py-1 w-fit rounded-full text-sm font-medium flex items-center ${getStatusStyles(
                      request.status
                    )}`}
                  >
                    <BsDot className="text-xl" />{" "}
                    {capitalizeFirstLetter(request.status)}
                  </span>
                </td>

                <td className="px-6 py-4 border-b text-left relative">
                  {/* Dropdown Button */}
                  <button
                    onClick={() =>
                      setDropdownOpen((prev) =>
                        prev === request.req_code ? null : request.req_code
                      )
                    }
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none"
                  >
                    <FaEllipsisVertical className="text-gray-400 text-lg" />
                  </button>
                  {/* Dropdown Menu */}
                  {dropdownOpen === request.req_code && (
                    <div className="absolute right-0 z-10 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {statusOptions.map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() =>
                            updateRequestStatus( value)
                          }
                          className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsTable;
