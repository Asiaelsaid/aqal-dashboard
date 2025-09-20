import { useState } from "react";
import UnitAccordion from "./UnitAccordion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Property } from "@interfaces";



const PropertyAccordion = ({ property }: { property: Property }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <div
        className="p-5 bg-purple-100 hover:bg-purple-200 cursor-pointer rounded-lg shadow-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center w-4/5">
            <p className="font-semibold text-lg text-gray-800">{property.name}</p>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Total:</span>
                <span className="font-semibold text-lg">{property.total_units_count || property.total_units} units</span>
              </div>
              {property.residential_units_count > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {property.residential_units_count} Residential
                  </span>
                </div>
              )}
              {property.commercial_units_count > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {property.commercial_units_count} Commercial
                  </span>
                </div>
              )}
            </div>
            <p className="text-gray-600">{property.location}</p>
          </div>
          <button className="text-gray-600 transition-transform">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          {property.units.map((unit, index) => (
            <UnitAccordion key={index} unit={unit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyAccordion;
