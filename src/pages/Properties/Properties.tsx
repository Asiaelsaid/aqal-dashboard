import PropertiesFilter from "@components/Properties/PropertiesFilter";
import PropertyCard from "@components/Properties/PropertyCard";
import { useState, useMemo } from "react";
import imageOne from "@assets/images/Image (1).png";
import useCustomQuery from "@hooks/useCustomQuery";
import Pagination from "@components/Properties/Pagination";
import { FiSearch } from "react-icons/fi";
import PagesHeading from "@components/UI/PagesHeading";

interface IProperty {
  id: number;
  name: string;
  property_type: { name: string };
  conditions: { name: string | null };
  location: string;
  total_units: number;
  vacant_units: number;
  sold_units: number;
  images: {
    image: string;
  }[];
}

const ITEMS_PER_PAGE = 20;

const Properties = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useCustomQuery({
    queryKey: ["properties"],
    url: "/owners/properties",
  });
  const propertiesData = data?.data;
  const filteredProperties = useMemo(() => {
    if (!searchQuery) {
      return propertiesData || [];
    }
    return (
      propertiesData.filter((property: IProperty) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
          property?.name.toLowerCase().includes(lowerCaseQuery) ||
          property?.location.toLowerCase().includes(lowerCaseQuery) ||
          property?.property_type.name.toLowerCase().includes(lowerCaseQuery) ||
          String(property.total_units).includes(lowerCaseQuery) ||
          String(property.vacant_units).includes(lowerCaseQuery) ||
          String(property.sold_units).includes(lowerCaseQuery)
        );
      }) || []
    );
  }, [data, searchQuery]);

  const offset = currentPage * ITEMS_PER_PAGE;

  const currentProperties = useMemo(
    () => filteredProperties.slice(offset, offset + ITEMS_PER_PAGE),
    [filteredProperties, currentPage]
  );

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected);

  // Calculate total pages based on filtered properties
  const totalPages = filteredProperties.length
    ? Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
    : 1;

  // Search input component
  const searchInput = (
    <div className="flex items-center w-full max-w-md px-4 py-2 text-gray-500 bg-white border rounded-lg shadow-sm space-x-2 lg:w-1/4">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
      />
    </div>
  );

  return (
    <div className="flex-1 p-5 bg-gray-50">
      <PagesHeading heading="Properties" child={searchInput} />
      <PropertiesFilter />
      {/* Property Cards */}
      <div className="p-4 space-y-4">
        {currentProperties?.map((property: IProperty) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.name}
            type={property.property_type.name}
            condition={property.conditions.name || "N/A"}
            location={property.location}
            units={`${property.total_units} units (${property.sold_units} sold, ${property.vacant_units} vacant)`}
            image={property.images[0]?.image || imageOne}
          />
        ))}
      </div>
      <hr />
      {/* Pagination */}
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Properties;
