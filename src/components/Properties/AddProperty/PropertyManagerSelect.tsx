import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  } from "@headlessui/react";
import useCustomQuery from "@hooks/useCustomQuery";
  import { PropertyData } from "@interfaces";
  import { Fragment } from "react";
  import { HiChevronDown } from "react-icons/hi";
  
  interface PropertyManagerProps {
    formData: PropertyData;
    setFormData: React.Dispatch<React.SetStateAction<PropertyData>>;
   
  }
  interface IpropertyManagers {
    id: number;
    first_name: string;
    last_name: string;
  }
  const PropertyManagerSelect: React.FC<PropertyManagerProps> = ({
    formData,
    setFormData,
    
  }) => {
    const {data}=useCustomQuery({  queryKey: ["propertyMangers"],
      url: "/users/managers/",})
      const propertyManagers :IpropertyManagers[] =data?.data
    const selectedManager = propertyManagers?.find(
      (manager) => manager.id === formData.property_manager
    );
  
    return (
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Property Manager
        </label>
        <Listbox
          as="div"
          value={formData.property_manager}
          onChange={(value) =>
            setFormData({ ...formData, property_manager: Number(value) })
          }
        >
          {({ open }) => (
            <div className="relative">
              <ListboxButton className="w-full border border-gray-300 rounded-lg p-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500">
                <span>
                  {selectedManager
                    ? `${selectedManager.first_name} ${selectedManager.last_name}`
                    : "Select a Manager"}
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
                {propertyManagers?.map((manager) => (
                  <ListboxOption
                    key={manager?.id}
                    value={manager?.id}
                    as={Fragment}
                    disabled={false}
                  >
                    {({ selected, disabled }) => (
                      <li
                        className={`cursor-pointer select-none p-2 list-none transition-colors hover:bg-purple-400 hover:text-white ${
                          selected ? "bg-purple-500 text-white" : "text-gray-700"
                        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {manager?.first_name} {manager?.last_name}
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
  
  export default PropertyManagerSelect;
  