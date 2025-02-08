import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import useCustomQuery from "@hooks/useCustomQuery";
import { ITenantData } from "@interfaces";
import { Fragment, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

interface TenantData {
  id: number;
  first_name: string;
  last_name: string;
  has_unit: boolean; // Add this property to the interface
}

interface TenantSelectProps {
  formData: ITenantData;
  setFormData: React.Dispatch<React.SetStateAction<ITenantData>>;
}

const TenantSelect: React.FC<TenantSelectProps> = ({
  formData,
  setFormData,
}) => {
  const { data } = useCustomQuery({
    queryKey: ["tenants"],
    url: "/users/tenants/",
  });
  const tenants: TenantData[] = data?.data;

  // Filter tenants where has_unit is false
  const filteredTenants = tenants?.filter((tenant) => !tenant.has_unit);

  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter tenants based on the search query
  const tenantsToDisplay = filteredTenants?.filter((tenant) =>
    `${tenant.first_name} ${tenant.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const selectedTenant = tenants?.find(
    (tenant) => tenant.id === formData.tenant
  );

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Tenant Name
      </label>
      <Listbox
        as="div"
        value={formData.tenant}
        onChange={(value) =>
          setFormData({ ...formData, tenant: Number(value) })
        }
      >
        {({ open }) => (
          <div className="relative">
            <ListboxButton className="w-full border border-gray-300 rounded-lg p-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500">
              <span>
                {selectedTenant
                  ? `${selectedTenant.first_name} ${selectedTenant.last_name}`
                  : "Select a Tenant"}
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
              {/* Add Search Input */}
              <div className="p-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Tenant..."
                  className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Render filtered tenants */}
              {tenantsToDisplay?.map((tenant) => (
                <ListboxOption key={tenant.id} value={tenant.id} as={Fragment}>
                  {({ selected, disabled }) => (
                    <li
                      className={`cursor-pointer select-none p-2 list-none transition-colors hover:bg-purple-400 hover:text-white ${
                        selected ? "bg-purple-500 text-white" : "text-gray-700"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {tenant.first_name} {tenant.last_name}
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

export default TenantSelect;
