import { BsDot } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa6";

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
  const getStatusStyles = (status: string): string => {
    console.log(status);

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
              <th className="px-6 py-3 border-b text-left">Urgency</th>
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
                    className={`px-2 py-1 w-fit rounded-full text-xs font-medium flex items-center ${getStatusStyles(
                      request.status
                    )}`}
                  >
                       <BsDot />{" "} {request.status}
                  </span>
                </td>

                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {request.urgency}
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
