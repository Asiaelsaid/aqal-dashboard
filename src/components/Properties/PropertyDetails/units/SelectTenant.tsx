import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import useCustomQuery from "@hooks/useCustomQuery";
import { Fragment, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

interface Tenant {
  id: number;
  first_name: string;
  last_name: string;
  has_unit: boolean;
}

interface IProps {
  selectedTenant: number;
  onSelectTenant: (tenantId: number) => void;
}

const SelectTenant: React.FC<IProps> = ({ selectedTenant, onSelectTenant }) => {
  const { data } = useCustomQuery({
    queryKey: ["Tenants"],
    url: `/users/tenants/`,
  });
  const tenants: Tenant[] = data?.data;

  const [selectedId, setSelectedId] = useState<number>(selectedTenant);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tenantsToDisplay = tenants?.filter((tenant) =>
    `${tenant.first_name} ${tenant.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const selectedTenantData = tenants?.find(
    (tenant) => tenant.id === selectedTenant
  );

  const handleChange = (tenantId: number) => {
    setSelectedId(tenantId);
    onSelectTenant(tenantId);
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">Tenant</label>
      <Listbox value={selectedId} onChange={handleChange}>
        {({ open }) => (
          <div className="relative">
            <ListboxButton className="w-full border rounded-lg p-2 text-left flex items-center justify-between">
              <span>
                {selectedTenantData
                  ? `${selectedTenantData.first_name} ${selectedTenantData.last_name}`
                  : "Select a tenant"}
              </span>
              <HiChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  open ? "rotate-180" : ""
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
              <div className="p-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Tenant..."
                  className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              {tenantsToDisplay?.map((tenant) => (
                <ListboxOption
                  key={tenant.id}
                  value={tenant.id}
                  as={Fragment}
                  disabled={tenant.has_unit}
                >
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

export default SelectTenant;
