import useCustomQuery from "@hooks/useCustomQuery";
import toast from "react-hot-toast";
import { FaArrowDown } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import FileIcon from "@assets/images/File type icon.png";
interface IProperty {
  id: number;
  first_name: string;
  last_name: string;
  unit_number: string;
  tims_report: string;
  lease_contract: string;
  outstanding_payment: string;
}
const TableTenantsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useCustomQuery({
    queryKey: ["tentantsDetails"],
    url: `/managers/tenants-with-units/${id}`,
  });
  const checkBox = (
    <input type="checkbox" className="w-4 mr-1 h-4 rounded-md" />
  );
  const tentantsData = data?.data;

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
          <thead className="text-xs text-gray-600  bg-gray-100">
            <tr>
              <th className="flex items-center px-6 py-3 border-b">
                {checkBox} Tenant name <FaArrowDown className="ml-1" />
              </th>
              <th className="px-6 py-3 border-b">Unit number</th>
              <th className="px-6 py-3 border-b">TIMS Report</th>
              <th className="px-6 py-3 border-b">Contract</th>
              <th className="px-6 py-3 border-b">Outstanding payment</th>
              <th className="px-6 py-3 border-b"></th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {tentantsData?.map((property: IProperty) => (
              <tr key={property?.id} className="hover:bg-gray-50 ">
                <td className="px-6 py-4 border-b   whitespace-nowrap">
                  {checkBox} <span className="mr-1">{property.first_name}</span>
                  {property.last_name}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap">
                  {property.unit_number}
                </td>
                <td
                  className="px-6 py-4 border-b   whitespace-nowrap underline cursor-pointer "
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
                <td className="px-6 py-4 border-b ">
                  {property?.outstanding_payment}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTenantsDetails;
