import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import useCustomQuery from "@hooks/useCustomQuery";
import { ITenantData } from "@interfaces";
import { HiChevronDown } from "react-icons/hi";
import { Fragment } from "react/jsx-runtime";

interface IPropertySelectProps {
  formData: ITenantData;
  setFormData: React.Dispatch<React.SetStateAction<ITenantData>>;
}
interface IPropertySelect {
    id:number;
    name: string;
}
const PropertySelect: React.FC<IPropertySelectProps> = ({
  formData,
  setFormData,
}) => {

    const { data } = useCustomQuery({
        queryKey: ["properties"],
        url: "/owners/properties",
      });
    const propertiesData=data?.data
  const selectedPropertyType = propertiesData.find(
    (property:IPropertySelect) => property.id === Number(formData.property)
  );
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Property Type
      </label>
      <Listbox
        as="div"
        value={formData.property}
        onChange={(value) =>
          setFormData({ ...formData, property: value })
        }
      >
        {({ open }) => (
          <div className="relative">
            <ListboxButton className="w-full border border-gray-300 rounded-lg p-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500">
              <span>
                {selectedPropertyType
                  ? selectedPropertyType.name
                  : "Select Property Type"}
              </span>
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
              {propertiesData?.map((property:IPropertySelect) => (
                <ListboxOption
                  key={property?.id}
                  value={property?.id}
                  as={Fragment}
                  disabled={false}
                >
                  {({ selected, disabled }) => (
                    <li
                      className={`cursor-pointer select-none p-2 list-none transition-colors  hover:bg-purple-400 hover:text-white ${
                        selected ? "bg-purple-500 text-white" : "text-gray-700"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {property?.name}
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

export default PropertySelect;
