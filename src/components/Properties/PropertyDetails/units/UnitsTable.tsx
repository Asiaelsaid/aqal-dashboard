import useAxios from "@config/axios.config";
import { IErrorrEsponse } from "@interfaces";
import { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditUnit from "./EditUnit";

interface Unit {
  id: number;
  unit_number: string;
  unit_level: string;
  status: string;
  unit_type_details?: {
    name: string;
    category: string;
  };
  is_residential?: boolean;
  is_commercial?: boolean;
  tenant_details?: {
    user_doc: string;
  };
}

interface UnitsTableProps {
  units: Unit[];
  properyName: string;
  onRefetch: () => void;
}

const UnitsTable: React.FC<UnitsTableProps> = ({
  units,
  properyName,
  onRefetch,
}) => {
  const axiosInstance = useAxios();
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<number>(0);

  const handleDeleteUnit = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/owners/units/${id}/`);
      if (response.status === 200) {
        onRefetch();
        toast.success("Unit deleted successfully!");
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorrEsponse>;
      toast.error(`${errorObj.response?.data?.message}`, {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const handleEditUnit = (id: number) => {
    setSelectedUnit(id);
    setIsOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gray-100 text-gray-800';
      case 'occupied':
        return 'bg-yellow-100 text-yellow-800';
      case 'bought':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUnitTypeBadgeColor = (unit: Unit) => {
    if (unit.is_residential) {
      return 'bg-blue-100 text-blue-800';
    } else if (unit.is_commercial) {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="p-6 bg-white shadow-sm rounded-lg border border-gray-200">
        <p className="text-xl font-bold text-gray-800 mb-4">{properyName}</p>
        <p className="text-gray-500 mt-1 text-sm">
          Access the Access the inspection Management sheet
        </p>

        <h2 className="text-lg font-medium mt-6">
          Units list ({properyName})
        </h2>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
            <thead className="text-xs text-gray-500 bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 border-b">
                  Unit number
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Level
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Unit Type
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  TIMS Report
                </th>
                {role === "admin" && (
                  <th scope="col" className="px-6 py-3 border-b text-center">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {units?.map((unit, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b text-gray-500 whitespace-nowrap">
                    {unit.unit_number}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                    {unit.unit_level}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                    {unit.unit_type_details ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUnitTypeBadgeColor(unit)}`}>
                        {unit.unit_type_details.name}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Not assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(unit.status)}`}>
                      {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                    </span>
                  </td>
                  {unit?.tenant_details?.user_doc ? (
                    <td
                      className="px-6 py-4 border-b text-gray-500 underline cursor-pointer whitespace-nowrap"
                      onClick={() =>
                        window.open(unit?.tenant_details?.user_doc, "_blank")
                      }
                    >
                      View Tims report
                    </td>
                  ) : (
                    <td className="px-6 py-4 border-b text-red-500">
                      Not available
                    </td>
                  )}
                  {role === "admin" && (
                    <td className="px-6 py-4 border-b text-center">
                      <div className="inline-flex space-x-2">
                        <RiDeleteBinLine
                          className="text-lg text-red-600 cursor-pointer"
                          onClick={() => handleDeleteUnit(unit.id)}
                        />
                        <FiEdit2
                          className="text-lg text-blue-500 cursor-pointer"
                          onClick={() => handleEditUnit(unit.id)}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && (
        <EditUnit id={selectedUnit} isOpen={isOpen} setIsOpen={setIsOpen} onRefetch={onRefetch} />
      )}
    </>
  );
};

export default UnitsTable;
