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
  
  interface PropertyOwnerProps {
    formData: PropertyData;
    setFormData: React.Dispatch<React.SetStateAction<PropertyData>>;
  }
  
  interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    role: string;
  }
  
  const PropertyOwnerSelect: React.FC<PropertyOwnerProps> = ({
    formData,
    setFormData,
  }) => {
    // Fetch users
    const { data } = useCustomQuery({
      queryKey: ["propertyOwners"],
      url: "/users/owners/",
    });
  
    // Filter only users with role: "owners"
    const propertyOwners: IUser[] = data?.data?.filter(
      (user: IUser) => user.role === "owners"
    );
  
    // Find the selected owner (use formData.user instead of formData.property_manager)
    const selectedOwner = propertyOwners?.find((owner) => owner.id === formData.user);
  
    return (
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Property Owner
        </label>
        <Listbox
          as="div"
          value={formData.user} 
          onChange={(value) =>
            setFormData({ ...formData, user: Number(value) }) 
          }
        >
          {({ open }) => (
            <div className="relative">
              <ListboxButton className="w-full border border-gray-300 rounded-lg p-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500">
                <span>
                  {selectedOwner
                    ? `${selectedOwner.first_name} ${selectedOwner.last_name}`
                    : "Select an Owner"}
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
                {propertyOwners?.map((owner) => (
                  <ListboxOption
                    key={owner?.id}
                    value={owner?.id}
                    as={Fragment}
                    disabled={false}
                  >
                    {({ selected, disabled }) => (
                      <li
                        className={`cursor-pointer select-none p-2 list-none transition-colors hover:bg-purple-400 hover:text-white ${
                          selected ? "bg-purple-500 text-white" : "text-gray-700"
                        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {owner?.first_name} {owner?.last_name}
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
  
  export default PropertyOwnerSelect;
  