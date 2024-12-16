import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { PropertyData } from "@interfaces";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";

interface PropertyTypeProps {
  formData: PropertyData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const PropertyTypeSelect: React.FC<PropertyTypeProps> = ({
  formData,
  setFormData,
}) => {
  const propertyTypes = ["Apartment", "House"];

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Property Type
      </label>
      <Listbox
        as="div"
        value={formData.propertyType}
        onChange={(value) => setFormData({ ...formData, propertyType: value })}
      >
        {({ open }) => (
          <div className="relative">
            <ListboxButton className="w-full border border-gray-300 rounded-lg p-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500">
              <span>{formData.propertyType || "Select Property Type"}</span>
              <HiChevronDown
                className={`h-5 w-5 text-gray-500 transform transition-transform duration-500 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </ListboxButton>
            <ListboxOptions
              static
              className={`absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-auto transform transition-all duration-500 ${
                open
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
              } origin-top`}
            >
              {propertyTypes.map((type, idx) => (
                <ListboxOption
                  key={idx}
                  value={type}
                  as={Fragment}
                  disabled={false}
                >
                  {({ selected, disabled }) => (
                    <li
                      className={`cursor-pointer select-none p-2 list-none transition-colors ${
                        selected ? "bg-purple-500 text-white" : "text-gray-700"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {type}
                    </li>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default PropertyTypeSelect;
