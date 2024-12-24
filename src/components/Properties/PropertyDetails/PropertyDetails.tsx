import IconText from "./IconText";
import ImagePreview from "./ImagePreview";
import PropertyDetailsCard from "./PropertyDetailsCard";

interface IProps {
  property: {
    id: number;
    name: string;
    description: string;
    location: string;
    images: { image: string }[];
    property_manager: { first_name: string; last_name: string };
    property_type: { name: string };
    property_level: string;
    total_units: string;
    total_units_count:string;
    bought_units_count:string;
    occupied_units_count:string;
    unit_types: string;
    vacant_units_count: string;
    common_areas: {
      id: number;
      name: string;
    }[];
    amenities: {
      id: number;
      name: string;
    }[];
  };
  onRefresh: () => void;
}

interface IIconText {
  id: number;
  name: string;
}
const PropertyDetails: React.FC<IProps> = ({ property, onRefresh }) => {
  return property ? (
    <div className="grid lg:grid-cols-10 gap-4 bg-white mt-8 p-6 rounded-lg border">
      <ImagePreview
        images={property?.images}
        name={property?.name}
        propertyId={property?.id}
        onRefresh={onRefresh}
      />

      <div className="lg:col-span-7">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          {property?.name || "Property Name"}
        </h1>
        <p className="text-gray-500 mb-6">
          {property?.description || "Property description not available."}
        </p>

        <div className="grid grid-cols-3 gap-11">
          <PropertyDetailsCard
            label="Property Address"
            value={property?.location}
          />
          <PropertyDetailsCard label="Year of Build" value="2019" />
          <PropertyDetailsCard
            label="Property Manager"
            value={`${property?.property_manager?.first_name || "N/A"} ${
              property?.property_manager?.last_name || ""
            }`}
          />
          <PropertyDetailsCard
            label="Property Type"
            value={property?.property_type?.name}
          />
          <PropertyDetailsCard
            label="Property Levels"
            value={property?.property_level}
          />
          <PropertyDetailsCard label="Unit Count" value={property?.total_units_count} />
          <PropertyDetailsCard label="Units bought" value={property?.bought_units_count} />
          <PropertyDetailsCard label="Units being rented" value={property?.occupied_units_count} />
          <PropertyDetailsCard
            label="Total Units"
            value={property?.total_units}
          />
          <PropertyDetailsCard
            label="Vacant Units"
            value={property?.vacant_units_count}
          />
          <PropertyDetailsCard
            label="Types of units"
            value={property?.unit_types}
          />
        </div>

        <div className="grid grid-cols-2 gap-11 mt-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Property Common Areas
            </h3>
            <div className="flex flex-col gap-4">
              {property?.common_areas?.map((area: IIconText) => (
                <IconText key={area.id} text={area.name} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Property Amenities
            </h3>
            <ul className="flex flex-wrap gap-4">
              {property?.amenities?.map((amenity: IIconText) => (
                <IconText
                  key={amenity.id}
                  text={amenity.name}
                  // icon={(
                  //   amenity.name === "Swimming Pool" && <FaSwimmingPool />) ||
                  //   (amenity.name === "Garden" && <FaLeaf />)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PropertyDetails;
