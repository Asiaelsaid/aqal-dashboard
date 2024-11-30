import PropertiesFilter from "@components/Properties/PropertiesFilter";
import PropertiesHeader from "@components/Properties/PropertiesHeader";
import PropertyCard from "@components/Properties/PropertyCard";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import ReactPaginate from "react-paginate";

interface IProps {}

const properties = [
  {
    title: "White Stone Apartments",
    type: "Apartment",
    condition: "Good",
    location: "Nairobi, Kenya",
    units: "6 units (2 sold, 4 vacant)",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Maple Heights Apartments",
    type: "Apartment",
    condition: "Good",
    location: "Nairobi, Kenya",
    units: "6 units (2 sold, 4 vacant)",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Fairview Estate",
    type: "House",
    condition: "Good",
    location: "Nairobi, Kenya",
    units: "6 units (2 sold, 4 vacant)",
    image: "https://via.placeholder.com/150",
  },
];

const Properties: React.FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  // Calculate displayed properties
  const offset = currentPage * itemsPerPage;
  const currentProperties = properties.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="flex-1">
      <PropertiesHeader />
      <PropertiesFilter />
      <div className="p-4 space-y-4">
        {currentProperties.map((property, index) => (
          <PropertyCard key={index} {...property} />
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
            <span className="text-gray-600">Previous</span>
          </span>
        }
        nextLabel={
          <span className="flex items-center space-x-1">
            <span className="text-gray-600">Next</span>
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
