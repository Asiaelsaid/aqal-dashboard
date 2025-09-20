import useAxios from "@config/axios.config";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsDot } from "react-icons/bs";
import { FaArrowDown, FaEllipsisVertical } from "react-icons/fa6";
import { FiUpload, FiDownload, FiTrash2 } from "react-icons/fi";
import ButtonGroup from "./ButtonGroup";
import Pagination from "@components/Properties/Pagination";
import DateRangePicker from "@components/Properties/Filters/DateRangePicker";
import { formatShortDate } from "@utils/dateUtils";
import { Request } from "@interfaces";

interface RequestsTableProps {
  unitId: number;
  requests: Request[];
}

const RequestsTable: React.FC<RequestsTableProps> = ({ requests, unitId }) => {
  const axiosInstance = useAxios();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [propertyRequests, setPropertyRequests] = useState<Request[]>(requests);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;
  const [uploadingReceipt, setUploadingReceipt] = useState<number | null>(null);

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const getStatusStyles = (request: Request): string => {
    const now = new Date();
    const createdAt = new Date(request.created_at);
    const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

    // If request is completed, show green
    if (request.status === "completed") {
      return "bg-green-100 text-green-700";
    }

    // If request is cancelled, show gray
    if (request.status === "cancelled") {
      return "bg-gray-100 text-gray-700";
    }

    // If request is in progress, show orange
    if (request.status === "in_progress") {
      return "bg-orange-100 text-orange-700";
    }

    // For pending requests, color based on time elapsed
    if (daysSinceCreation >= 2) {
      return "bg-red-100 text-red-700"; // Red - Past due date
    } else if (daysSinceCreation >= 1) {
      return "bg-yellow-100 text-yellow-700"; // Yellow - Urgent
    } else {
      return "bg-blue-100 text-blue-700"; // Blue - New
    }
  };

  const capitalizeFirstLetter = (text: string): string => {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Fetch requests on initial render
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

  const uploadReceipt = async (requestId: number, file: File) => {
    setUploadingReceipt(requestId);
    try {
      const formData = new FormData();
      formData.append('receipt_attachment', file);

      const { data } = await axiosInstance.post(
        `/tenants/requests/${requestId}/upload-receipt/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (data.status === 200) {
        toast.success("Receipt uploaded successfully!");
        await refechRequst();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to upload receipt.";
      toast.error(errorMessage);
      console.error("Error uploading receipt:", error);
    } finally {
      setUploadingReceipt(null);
    }
  };

  const removeReceipt = async (requestId: number) => {
    try {
      const { data } = await axiosInstance.delete(
        `/tenants/requests/${requestId}/upload-receipt/`
      );
      
      if (data.status === 200) {
        toast.success("Receipt removed successfully!");
        await refechRequst();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to remove receipt.";
      toast.error(errorMessage);
      console.error("Error removing receipt:", error);
    }
  };

  const handleFileUpload = (requestId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid file (JPEG, PNG, GIF, or PDF)");
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      uploadReceipt(requestId, file);
    }
    // Reset the input
    event.target.value = '';
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
     // handle date range filter
   const handleDateFilterChange = (
     range: { startDate: Date | null; endDate: Date | null } | null
   ) => {
     setDateRange(range ?? { startDate: null, endDate: null });

     if (range?.startDate && range?.endDate) {
       const filteredRequests = requests.filter((req) => {
         const requestDate = new Date(req.created_at);
         return (
           range.startDate &&
           range.endDate &&
           requestDate >= new Date(range.startDate) &&
           requestDate <= new Date(range.endDate)
         );
       });

       setPropertyRequests(filteredRequests);
     } else {
       setPropertyRequests(requests);
     }
   };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Requests Table</h2>
        <ButtonGroup onStatusChange={handleStatusFilterChange} />
      </div>
      <DateRangePicker value={dateRange} onChange={handleDateFilterChange} />
      <div className="overflow-x-auto mt-4 shadow-md">
        {currentRequests.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                         <thead className="text-xs text-gray-500 bg-gray-100">
               <tr>
                 <th className="px-6 py-3 border-b text-left flex items-center" title="When the request was submitted">
                   Created <FaArrowDown className="ml-1" />
                 </th>
                 <th className="px-6 py-3 border-b text-left" title="When the service is preferred to be completed">
                   Preferred Date
                 </th>
                 <th className="px-6 py-3 border-b text-left">Request ID</th>
                 <th className="px-6 py-3 border-b text-left">Service type</th>
                 <th className="px-6 py-3 border-b text-left">Description</th>
                 <th className="px-6 py-3 border-b text-left">Status</th>
                 <th className="px-6 py-3 border-b text-left">Receipt</th>
                 <th className="px-6 py-3 border-b text-left">Actions</th>
               </tr>
             </thead>
            <tbody>
              {currentRequests.length > 0 &&
                                 currentRequests.map((request) => (
                   <tr key={request.req_code}>
                     <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                       {formatShortDate(request.created_at)}
                     </td>
                     <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                       <span className={(() => {
                         const preferredDate = new Date(request.preferred_service_date);
                         const today = new Date();
                         today.setHours(0, 0, 0, 0);
                         preferredDate.setHours(0, 0, 0, 0);
                         
                         if (preferredDate < today) {
                           return "text-red-600 font-medium"; // Past due
                         } else if (preferredDate.getTime() === today.getTime()) {
                           return "text-orange-600 font-medium"; // Due today
                         } else {
                           return "text-gray-600"; // Future date
                         }
                       })()}>
                         {formatShortDate(request.preferred_service_date)}
                       </span>
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
                          request
                        )}`}
                      >
                        <BsDot className="text-xl" />
                        {request.status === "pending" ? 
                          (() => {
                            const now = new Date();
                            const createdAt = new Date(request.created_at);
                            const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
                            
                            if (daysSinceCreation >= 2) {
                              return "Past Due Date";
                            } else if (daysSinceCreation >= 1) {
                              return "Urgent";
                            } else {
                              return "New";
                            }
                          })() : 
                          capitalizeFirstLetter(request.status)
                        }
                      </span>
                                         </td>
                     <td className="px-6 py-4 border-b text-left">
                       {request.status === "completed" ? (
                         <div className="flex items-center space-x-2">
                           {request.receipt_attachment ? (
                             <>
                               <button
                                 onClick={() => window.open(request.receipt_attachment, '_blank')}
                                 className="p-1 text-green-600 hover:text-green-800 transition-colors"
                                 title="View Receipt"
                               >
                                 <FiDownload className="text-sm" />
                               </button>
                               <button
                                 onClick={() => removeReceipt(request.id)}
                                 className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                 title="Remove Receipt"
                               >
                                 <FiTrash2 className="text-sm" />
                               </button>
                             </>
                           ) : (
                             <div className="flex items-center space-x-2">
                               <input
                                 type="file"
                                 id={`receipt-upload-${request.id}`}
                                 className="hidden"
                                 accept=".pdf,.jpg,.jpeg,.png,.gif"
                                 onChange={(e) => handleFileUpload(request.id, e)}
                                 disabled={uploadingReceipt === request.id}
                               />
                               <label
                                 htmlFor={`receipt-upload-${request.id}`}
                                 className={`p-1 cursor-pointer transition-colors ${
                                   uploadingReceipt === request.id
                                     ? 'text-gray-400 cursor-not-allowed'
                                     : 'text-blue-600 hover:text-blue-800'
                                 }`}
                                 title="Upload Receipt"
                               >
                                 <FiUpload className="text-sm" />
                               </label>
                               {uploadingReceipt === request.id && (
                                 <span className="text-xs text-gray-500">Uploading...</span>
                               )}
                             </div>
                           )}
                         </div>
                       ) : (
                         <span className="text-gray-400 text-sm">-</span>
                       )}
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
        ) : (
          <p className="text-center text-gray-500">No requests found.</p>
        )}
      </div>
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default RequestsTable;
