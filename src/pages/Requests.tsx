import DateRangePicker from "@components/Properties/Filters/DateRangePicker";
import ButtonGroup from "@components/Requests/ButtonGroup";
import PropertyAccordion from "@components/Requests/PropertyAccordion";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import useCustomQuery from "@hooks/useCustomQuery";
import { FiSearch } from "react-icons/fi";
interface Request {
  req_code: string;
  category: string;
  description: string;
  status: string;
  urgency: string;
  preferred_service_date: string;
}
interface Tenant {
  id: number;
  name: string;
  email: string;
}
interface Unit {
  unit_number: string;
  unit_level: number;
  status: string;
  tenant: Tenant | null;
  requests: Request[];
}
interface Property {
  property_name: string;
  location: string;
  total_units: number;
  units: Unit[];
}


const Requests = () => {
  const { data } = useCustomQuery({
    queryKey: ["requests"],
    url: "/managers/properties-requests",
  });
  const propertyRequests =data?.data
  
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
  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Requests" child={searchInput} />
      <SubHeading subHeading="Track Maintenancetickets from tenants swith ease" />
      <DateRangePicker />
      <div className="mt-8 border shadow rounded-lg p-6">
        <div className="flex justify-between items-center pb-4">
          <div>
            <p className="text-lg font-semibold flex items-center">
              All requests{" "}
              <span className="text-xs text-mainColor rounded-full bg-purple-100 w-8 h-5 flex items-center justify-center ml-2 border">
                30
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              See what requests you have made throughout
            </p>
          </div>
       <ButtonGroup/>
        </div>
        <div className="mt-8">
        {propertyRequests?.map((property:Property, index:number) => (
          <PropertyAccordion key={index} property={property} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Requests;
