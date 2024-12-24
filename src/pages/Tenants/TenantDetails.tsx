import ButtonGroup from "@components/Tenants/TenantDetails/ButtonGroup";
import TableTenantsDetails from "@components/Tenants/TenantDetails/Table";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TenantDetails = () => {
  const navigate = useNavigate();
  const searchInput = (
    <div className="flex items-center w-full max-w-md px-4 py-2 text-gray-500 bg-white border rounded-lg shadow-sm space-x-2 lg:w-1/4">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        // value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
      />
    </div>
  );

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex-1 p-5 bg-gray-50">
      <PagesHeading heading="Tenants" child={searchInput} />
      <SubHeading subHeading="Manage your all your tenants in one place" />
      <button
        onClick={goBack}
        className="flex items-center self-start my-8 text-gray-700 text-sm font-medium "
      >
        <FaArrowLeftLong className="mr-3" />
        Back
      </button>
      <ButtonGroup/>
      <TableTenantsDetails/>
    </div>
  );
};

export default TenantDetails;
