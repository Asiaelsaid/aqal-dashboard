import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import { FiSearch } from "react-icons/fi";


const Tenants = () => {
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
    return     <div className="flex-1 p-5 bg-gray-50">
    <PagesHeading heading="Tenants" child={searchInput} />
    <SubHeading subHeading="Manage your all your tenants in one place"/>
    </div>;
};

export default Tenants;