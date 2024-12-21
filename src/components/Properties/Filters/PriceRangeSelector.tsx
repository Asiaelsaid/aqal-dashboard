import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { useState } from "react";

interface IPriceRange {
  id: number;
  label: string;
  value: [number, number];
}

interface PriceRangeSelectorProps {
  onPriceRangeChange: (priceRange: IPriceRange) => void;
}

const PriceRanges: IPriceRange[] = [
  { id: 1, label: "0 - 5000", value: [0, 50] },
  { id: 2, label: "5000 - 10000", value: [50, 100] },
  { id: 3, label: "10000 - 20000", value: [100, 200] },
  { id: 4, label: "20000 - 50000", value: [200, 500] },
];

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({ onPriceRangeChange }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<IPriceRange>(); 

  const handlePriceRangeSelection = (priceRange: IPriceRange) => {
    setSelectedPriceRange(priceRange);
    onPriceRangeChange(priceRange);
  };

  return (
    <Listbox value={selectedPriceRange} onChange={handlePriceRangeSelection}>
      <div className="relative">
        <ListboxButton className="relative min-w-48 max-w-64 cursor-default rounded-md bg-white py-3.5 pl-3 pr-10 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6">
          <span className="block truncate">{selectedPriceRange?.label? selectedPriceRange?.label :'$ Any Price' }</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <FiChevronDown aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {PriceRanges.map((range) => (
            <ListboxOption
              key={range.id}
              value={range}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-purple-400 data-[focus]:text-white"
            >
              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                {range.label}
              </span>
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

export default PriceRangeSelector;
