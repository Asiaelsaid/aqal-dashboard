import useCustomQuery from "@hooks/useCustomQuery";
import toast from "react-hot-toast";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import FileIcon from "@assets/images/File type icon.png";
import { useState, useMemo } from "react";

interface IProperty {
  id: number;
  first_name: string;
  last_name: string;
  unit_number: string;
  status: string;
  tims_report: string;
  lease_contract: string;
  outstanding_payment: string;
  rent?: string;
  service_charge?: string;
  property_name: string;
  unit_type_name?: string;
  unit_type_category?: string;
  is_residential?: boolean;
  is_commercial?: boolean;
}

interface TableTenantsDetailsProps {
  activeFilter?: string;
}

const TableTenantsDetails: React.FC<TableTenantsDetailsProps> = ({ activeFilter = 'all' }) => {
  const { id } = useParams<{ id: string }>();
  const { data } = useCustomQuery({
    queryKey: ["tentantsDetails"],
    url: `/managers/tenants-with-units/${id}`,
  });

  // Sorting state
  const [sortColumn, setSortColumn] = useState<string>("unit_number");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter and sort tenants
  const tentantsData = useMemo(() => {
    if (!Array.isArray(data?.data)) return [];

    let filteredData = [...data.data];

    // Apply filter based on activeFilter
    if (activeFilter !== 'all') {
      filteredData = filteredData.filter((tenant: IProperty) => {
        switch (activeFilter) {
          case 'residential':
            return tenant.is_residential === true;
          case 'commercial':
            return tenant.is_commercial === true;
          case 'bought':
            // For bought units, we would need to check if the unit status is 'bought'
            // This might need to be implemented based on your business logic
            return tenant.status === 'bought';
          default:
            return true;
        }
      });
    }

    // Sort the filtered data
    return filteredData.sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];
      
      // Improved natural sort for unit_number
      if (sortColumn === "unit_number") {
        // Extract letter(s) and number(s) parts (e.g., A1, B1, C1)
        const regex = /^([A-Za-z]+)(\d+)$/;
        const matchA = String(valA).match(regex);
        const matchB = String(valB).match(regex);
        if (matchA && matchB) {
          const letterA = matchA[1];
          const letterB = matchB[1];
          const numA = parseInt(matchA[2], 10);
          const numB = parseInt(matchB[2], 10);
          // Compare letter part first (alphabetically)
          const letterCmp = letterA.localeCompare(letterB);
          if (letterCmp !== 0) {
            return sortDirection === "asc" ? letterCmp : -letterCmp;
          }
          // Then compare number part (numerically)
          if (!isNaN(numA) && !isNaN(numB)) {
            return sortDirection === "asc" ? numA - numB : numB - numA;
          }
        }
        // Fallback: if not matching, sort as string
        const cmp = String(valA).localeCompare(String(valB));
        return sortDirection === "asc" ? cmp : -cmp;
      }
      
      // Numeric sort for rent, service_charge, outstanding_payment
      if (["rent", "service_charge", "outstanding_payment"].includes(sortColumn)) {
        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        if (!isNaN(numA) && !isNaN(numB)) {
          return sortDirection === "asc" ? numA - numB : numB - numA;
        }
      }
      
      // Fallback to string sort
      const cmp = String(valA).localeCompare(String(valB));
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [data?.data, activeFilter, sortColumn, sortDirection]);

  // Handle header click to sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleNavigation = (url: string, name: string) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      toast.error(`${name} URL is not available.`);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-600 bg-gray-100">
            <tr>
              <th className="flex items-center px-6 py-3 border-b cursor-pointer select-none" onClick={() => handleSort("first_name")}>
                Tenant name {sortColumn === "first_name" && (sortDirection === "asc" ? <FaArrowDown className="ml-1" /> : <FaArrowUp className="ml-1" />)}
              </th>
              <th className="px-6 py-3 border-b cursor-pointer select-none" onClick={() => handleSort("property_name")}>
                Property name {sortColumn === "property_name" && (sortDirection === "asc" ? <FaArrowDown className="ml-1" /> : <FaArrowUp className="ml-1" />)}
              </th>
              <th className="px-6 py-3 border-b cursor-pointer select-none" onClick={() => handleSort("unit_number")}>
                Unit number {sortColumn === "unit_number" && (sortDirection === "asc" ? <FaArrowDown className="ml-1" /> : <FaArrowUp className="ml-1" />)}
              </th>
              <th className="px-6 py-3 border-b">Unit Type</th>
              <th className="px-6 py-3 border-b">TIMS Report</th>
              <th className="px-6 py-3 border-b">Contract</th>
              <th className="px-6 py-3 border-b cursor-pointer select-none" onClick={() => handleSort("outstanding_payment")}>
                Outstanding payment {sortColumn === "outstanding_payment" && (sortDirection === "asc" ? <FaArrowDown className="ml-1" /> : <FaArrowUp className="ml-1" />)}
              </th>
              <th className="px-6 py-3 border-b cursor-pointer select-none" onClick={() => handleSort("rent")}>
                Rent {sortColumn === "rent" && (sortDirection === "asc" ? <FaArrowDown className="ml-1" /> : <FaArrowUp className="ml-1" />)}
              </th>
              <th className="px-6 py-3 border-b cursor-pointer select-none" onClick={() => handleSort("service_charge")}>
                Service charge {sortColumn === "service_charge" && (sortDirection === "asc" ? <FaArrowDown className="ml-1" /> : <FaArrowUp className="ml-1" />)}
              </th>
              <th className="px-6 py-3 border-b"></th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {tentantsData?.map((property: IProperty) => {
              return (
                <tr key={property?.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                    <span className="mr-1">{property.first_name}</span>
                    {property.last_name}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                    {property.property_name}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                    {property.unit_number}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                    {property.unit_type_name ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.is_residential 
                          ? 'bg-blue-100 text-blue-800' 
                          : property.is_commercial 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.unit_type_name}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Not assigned</span>
                    )}
                  </td>
                  <td
                    className="px-6 py-4 border-b whitespace-nowrap underline cursor-pointer"
                    onClick={() =>
                      handleNavigation(property.tims_report, "TIMS report")
                    }
                  >
                    View Tims report
                  </td>
                  <td
                    className="px-6 py-4 flex items-center border-b text-gray-800 whitespace-nowrap underline cursor-pointer"
                    onClick={() =>
                      handleNavigation(property.lease_contract, "Contract")
                    }
                  >
                    <img src={FileIcon} alt="file type icon" />
                    <p className="ml-1 font-medium">Contract.pdf</p>
                  </td>
                  <td className="px-6 py-4 border-b">
                    {property?.outstanding_payment}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {property?.rent ?? "0.00"}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {property?.service_charge ?? "0.00"}
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTenantsDetails;
