import React from "react";
import { FaArrowDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface Tenant {
  id: number;
  avatar: string;
}

interface IProperty {
  id: number;
  name: string;
  location: string;
  total_units_count: number;
  occupied_units_count: number;
  vacant_units_count: number;
  bought_units_count: number;
  residential_units_count: number;
  commercial_units_count: number;
  tenants: Tenant[];
}

interface TableProps {
  data: IProperty[];
}

const TenantsTable: React.FC<TableProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`tenant-details/${id}`);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-500 bg-gray-100">
            <tr>
              <th className="flex items-center px-6 py-3 border-b">
                Property Names <FaArrowDown className="ml-1"/>
              </th>
              <th className="px-6 py-3 border-b">Location</th>
              <th className="px-6 py-3 border-b">Total Units</th>
              <th className="px-6 py-3 border-b">Residential</th>
              <th className="px-6 py-3 border-b">Commercial</th>
              <th className="px-6 py-3 border-b">Occupied</th>
              <th className="px-6 py-3 border-b">Vacant</th>
              <th className="px-6 py-3 border-b">Bought</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((property) => (
              <tr 
                key={property?.id} 
                className="hover:bg-gray-50 cursor-pointer" 
                onClick={() => handleRowClick(property.id)}
              >
                <td className="px-6 py-4 border-b text-gray-500 whitespace-nowrap">
                  {property.name}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap">
                  {property.location}
                </td>
                <td className="px-6 py-4 border-b text-gray-500 whitespace-nowrap">
                  <span className="font-medium text-gray-900">
                    {property?.total_units_count}
                  </span>
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {property?.residential_units_count || 0}
                  </span>
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {property?.commercial_units_count || 0}
                  </span>
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {property?.occupied_units_count}
                  </span>
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {property?.vacant_units_count}
                  </span>
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {property?.bought_units_count || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantsTable;
