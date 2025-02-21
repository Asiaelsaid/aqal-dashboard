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
            <p className="font-semibold text-lg text-gray-800">{property.property_name}</p>
            <p className="text-gray-600 font-semibold text-lg">{property.total_units} units</p>
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
