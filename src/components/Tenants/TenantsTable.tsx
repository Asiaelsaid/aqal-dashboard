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
  tenants: Tenant[];
}

interface TableProps {
  data: IProperty[];
}

const TenantsTable: React.FC<TableProps> = ({ data }) => {
  const navigate = useNavigate();
  // const checkBox = <input type="checkbox" className="w-4 mr-1 h-4 rounded-md" />;

  const handleRowClick = (id: number) => {
    navigate(`/tenant-details/${id}`);
  };
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-500  bg-gray-100">
            <tr>
              <th className="flex items-center px-6 py-3 border-b"> Property Names <FaArrowDown className="ml-1"/></th>
              <th className="px-6 py-3 border-b">Location</th>
              <th className="px-6 py-3 border-b">Number of units</th>
              <th className="px-6 py-3 border-b">Occupied units</th>
              <th className="px-6 py-3 border-b">Vacant units</th>
              {/* <th className="px-6 py-3 border-b">Tenants</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((property) => (
              <tr key={property?.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(property.id)}>
                <td className="px-6 py-4 border-b  text-gray-500 whitespace-nowrap">
                {property.name}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap">
               {property.location}
                </td>
                <td className="px-6 py-4 border-b text-gray-500   whitespace-nowrap">
                  {property?.total_units_count}
                </td>
                <td className="px-6 py-4 border-b ">
                {property?.occupied_units_count}
                </td>
                <td className="px-6 py-4 border-b ">
                {property?.vacant_units_count}
                </td>
                {/* <td className="px-6 py-4 flex items-center space-x-2">
                {property?.tenants?.slice(0, 4).map((tenant) => (
                  <img
                    key={tenant.id}
                    src={tenant.avatar}
                    alt="Tenant Avatar"
                    className="h-8 w-8 rounded-full border"
                  />
                ))}
                {property?.tenants?.length > 4 && (
                  <span className="text-gray-500">+{property?.tenants?.length - 4}</span>
                )}
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TenantsTable;
