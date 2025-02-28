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
  tenant_details: {
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
  return (
    <>
      <div className="p-6 bg-white shadow-sm rounded-lg border border-gray-200">
        <p className="text-xl font-bold text-gray-800 mb-4">{properyName}</p>
        <p className="text-gray-500 mt-1 text-sm">
          Access the Access the inspection Management sheet
        </p>

        {/* <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
            Sold units
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
            Rented units
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
            Vacant units
          </button>
        </div> */}

        <h2 className="text-lg font-medium mt-6">
          Tenants list( {properyName})
        </h2>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
            <thead className="text-xs text-gray-500  bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 border-b">
                  Unit number
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Level
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  TIMS Report
                </th>
                {role === "admin" &&<th scope="col" className="px-6 py-3 border-b text-center"></th>}
              </tr>
            </thead>
            <tbody>
              {units?.map((unit, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b  text-gray-500 whitespace-nowrap">
                    {unit.unit_number}
                  </td>
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                    {unit.unit_level}
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
                    <td className="px-6 py-4 border-b text-red-500  ">
                      Not available
                    </td>
                  )}
                  {role === "admin" && (
                    <td className="px-6 py-4 border-b text-center">
                      <div className="inline-flex space-x-2">
                        <RiDeleteBinLine
                          className="text-lg text-red-600  cursor-pointer"
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
      )}{" "}
    </>
  );
};

export default UnitsTable;
