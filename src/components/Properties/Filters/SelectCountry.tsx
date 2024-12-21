import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
interface ICountry {
  id: number;
  name: string;
  imgURL: string;
}

interface SelectProps {
  onCountryChange: (country: ICountry) => void;
}
const Countries: ICountry[] = [
  { id: 1, name: "United States", imgURL: "https://flagcdn.com/us.svg" },
  { id: 2, name: "Canada", imgURL: "https://flagcdn.com/ca.svg" },
  { id: 3, name: "United Kingdom", imgURL: "https://flagcdn.com/gb.svg" },
  { id: 4, name: "Australia", imgURL: "https://flagcdn.com/au.svg" },
  { id: 5, name: "India", imgURL: "https://flagcdn.com/in.svg" },
];
const SelectCountry: React.FC<SelectProps> = ({ onCountryChange }) => {
  const [selected, setSelected] = useState<ICountry>(Countries[0]);

  const handleSelection = (country: ICountry) => {
    setSelected(country);
    onCountryChange(country);
  };

  return (
    <Listbox value={selected} onChange={handleSelection}>
      <div className="relative">
        <ListboxButton className="relative min-w-48 max-w-64 cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <img
              alt=""
              src={selected?.imgURL}
              className="h-7 w-7 flex-shrink-0 rounded-full"
            />
            <span className="ml-3 block truncate">{selected?.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <FiChevronDown
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {Countries.map((country) => (
            <ListboxOption
              key={country.id}
              value={country}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-purple-400 data-[focus]:text-white "
            >
              <div className="flex items-center">
                <img
                  alt=""
                  src={country.imgURL}
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {country.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-500 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <FiCheck aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default SelectCountry;
