import PropertiesFilter from "@components/Properties/PropertiesFilter";
import PropertiesHeader from "@components/Properties/PropertiesHeader";
import PropertyCard from "@components/Properties/PropertyCard";
import { useState, useMemo } from "react";
import imageOne from "@assets/images/Image (1).png";
import useCustomQuery from "@hooks/useCustomQuery";
import Pagination from "@components/Properties/Pagination";

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

const ITEMS_PER_PAGE = 5;

const Properties = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useCustomQuery({
    queryKey: ["properties"],
    url: "/owners/properties",
  });

  // Calculate displayed properties dynamically based on the current page and items per page
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentProperties = useMemo(() => data?.data.slice(offset, offset + ITEMS_PER_PAGE), [data, currentPage]);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => setCurrentPage(selected);

  // const totalPages = data?.data.length ? Math.ceil(data?.data.length / ITEMS_PER_PAGE) : 1;
  const totalPages=15

  return (
    <div className="flex-1 p-5">
      <PropertiesHeader />
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
      <Pagination
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};


export default Properties;
