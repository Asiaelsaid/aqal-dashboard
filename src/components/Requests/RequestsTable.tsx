import useAxios from "@config/axios.config";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsDot } from "react-icons/bs";
import { FaArrowDown, FaEllipsisVertical } from "react-icons/fa6";
import ButtonGroup from "./ButtonGroup";
import Pagination from "@components/Properties/Pagination";

interface Request {
  id: number;
  req_code: string;
  category: string;
  description: string;
  status: string;
  urgency: string;
  preferred_service_date: string;
}

interface RequestsTableProps {
  unitId: number;
  requests: Request[];
}

const RequestsTable: React.FC<RequestsTableProps> = ({ requests, unitId }) => {
  const axiosInstance = useAxios();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [propertyRequests, setPropertyRequests] = useState<Request[]>(requests);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const getStatusStyles = (status: string): string => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-orange-100 text-orange-700";
      case "pending":
        return "bg-gray-200 text-gray-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const capitalizeFirstLetter = (text: string): string => {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Handle filter
  const handleStatusFilterChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page on filter change
    if (status) {
      const filteredRequests = requests.filter((req) => req.status === status);
      setPropertyRequests(filteredRequests);
    } else {
      setPropertyRequests(requests);
    }
  };

  const refechRequst = async () => {
    try {
      const { data } = await axiosInstance.get(
        `managers/units/${unitId}/requests/`
      );
      const fetchedRequests = data?.data;

      if (selectedStatus) {
        const filteredRequests = fetchedRequests.filter(
          (req: Request) => req.status === selectedStatus
        );
        setPropertyRequests(filteredRequests);
      } else {
        setPropertyRequests(fetchedRequests);
      }
    } catch (error) {
      toast.error("Failed to fetch requests.");
      console.error("Error fetching requests:", error);
    }
  };

  const updateRequestStatus = async (status: string, id: number) => {
    try {
      const { data } = await axiosInstance.patch(
        `/tenants/requests/${id}/update-status/`,
        { status }
      );
      if (data.status === 200) {
        toast.success("Request status updated successfully!");
        await refechRequst();
      }
    } catch (error) {
      toast.error("Failed to update request status.");
      console.error("Error updating status:", error);
    }
  };

  // Pagination Logic
  const totalRequests = propertyRequests.length;
  const totalPages = Math.ceil(totalRequests / requestsPerPage);
  const currentRequests = propertyRequests.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Requests Table</h2>
        <ButtonGroup onStatusChange={handleStatusFilterChange} />
      </div>
      <div className="overflow-x-auto mt-4 shadow-md">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-500 bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left flex items-center">
                Date <FaArrowDown className="ml-1" />
              </th>
              <th className="px-6 py-3 border-b text-left">Request ID</th>
              <th className="px-6 py-3 border-b text-left">Service type</th>
              <th className="px-6 py-3 border-b text-left">Description</th>
              <th className="px-6 py-3 border-b text-left">Status</th>
              <th className="px-6 py-3 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 &&
              currentRequests.map((request) => (
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
                  <td className="px-6 py-4 border-b text-left">
                    <span
                      className={`pr-3 py-1 w-fit rounded-full text-sm font-medium flex items-center ${getStatusStyles(
                        request.status
                      )}`}
                    >
                      <BsDot className="text-xl" />
                      {capitalizeFirstLetter(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-left relative">
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
                    {dropdownOpen === request.req_code && (
                      <div className="absolute right-0 z-10 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {statusOptions.map(({ value, label }) => (
                          <button
                            key={value}
                            onClick={() => {
                              updateRequestStatus(value, request.id);
                              setDropdownOpen(null);
                            }}
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
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default RequestsTable;
