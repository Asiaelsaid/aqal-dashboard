import PropertiesFilter from "@components/Properties/PropertiesFilter";
import PropertiesHeader from "@components/Properties/PropertiesHeader";
import PropertyCard from "@components/Properties/PropertyCard";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import imageOne from "@assets/images/Image (1).png";
import useCustomQuery from "@hooks/useCustomQuery";

interface IProperty {
  id: number;
  name: string;
  property_type: { name: string };
  conditions: { name: string | null };
  location: string;
  total_units: number;
  vacant_units: number;
  sold_units: number;
  images: string[];
}

const Properties = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const {data} = useCustomQuery({
    queryKey: ["properties"],
    url: "/owners/properties",
  });

  // Calculate displayed properties
  const offset = currentPage * itemsPerPage;
  const currentProperties = data?.data?.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="flex-1">
      <PropertiesHeader />
      <PropertiesFilter />
      <div className="p-4 space-y-4">
        {data?.data.map((property:IProperty) => (
            <PropertyCard
            key={property.id}
            id={property.id}
            title={property.name}
            type={property.property_type.name}
            condition={property.conditions.name || "N/A"}
            location={property.location}
            units={`${property.total_units} units (${property.sold_units} sold, ${property.vacant_units} vacant)`}
            image={property.images[0] || imageOne}
          />
        ))}
      </div>
      <hr />
      {/* <ReactPaginate
        previousLabel={
          <span className="flex items-center space-x-2 text-gray-600">
            <FaArrowLeftLong className="text-lg" />
            <span>Previous</span>
          </span>
        }
        nextLabel={
          <span className="flex items-center space-x-2 text-gray-600">
            <span>Next</span>
            <FaArrowRight className="text-lg" />
          </span>
        }
        breakLabel={"..."}
        onPageChange={handlePageChange}
        pageCount={15}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        containerClassName="flex justify-between items-center mt-6"
        pageClassName="w-8 h-8 flex items-center justify-center rounded-full text-sm text-gray-500 hover:bg-gray-200"
        activeClassName="bg-gray-100 text-gray-600"
        previousClassName="px-4 py-2 text-sm flex items-center justify-space-between rounded  hover:text-purple-600"
        nextClassName="px-4 py-2 text-sm flex items-center justify-space-betwee rounded  hover:text-purple-600"
        disabledClassName="text-gray-400 cursor-not-allowed"
        breakClassName="text-gray-500"
      /> */}
      <ReactPaginate
        previousLabel={
          <span className="flex items-center space-x-1">
            <FaArrowLeftLong className="mr-1" />
            <span className="text-gray-600">Previous</span>
          </span>
        }
        nextLabel={
          <span className="flex items-center space-x-1">
            <span className="text-gray-600">Next</span>
            <FaArrowRight className="ml-1" />
          </span>
        }
        breakLabel={"..."}
        onPageChange={handlePageChange}
        pageCount={15}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        containerClassName="flex items-center justify-between mt-6"
        previousClassName="mr-auto text-sm text-purple-600 hover:underline"
        nextClassName="ml-auto text-sm text-purple-600 hover:underline"
        pageClassName="w-8 h-8 flex items-center justify-center rounded-full text-sm text-gray-500 hover:bg-gray-200"
        activeClassName="bg-gray-100 text-gray-600"
        disabledClassName="text-gray-400 cursor-not-allowed"
        breakClassName="text-gray-500"
      />
    </div>
  );
};

export default Properties;
