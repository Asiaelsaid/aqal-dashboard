import { useState } from "react";
import AddPropertyModal from "./AddProperty/AddPropertyModal";
import SelectCountry from "./Filters/SelectCountry";
import DateRangePicker from "./Filters/DateRangePicker";
import PriceRangeSelector from "./Filters/PriceRangeSelector";

interface IProps {}

const PropertiesFilter: React.FC<IProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "",
    imgURL: "",
  });
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  //handler
  const onCountryChange = (category: { name: string; imgURL: string }) => {
    setSelectedCountry(category);
  };
  const onPriceRangeChange = (priceRange: {
    id: number;
    label: string;
    value: [number, number];
  }) => {
    setSelectedPriceRange(priceRange);
  };
  const openModal = () => setIsOpen(true);

  
  return (
    <div className="pb-4 space-y-6">
      <p className="text-base text-gray-500">
        Manage all your properties in one place
      </p>
      <hr />
      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 lg:w-1/2">
          <SelectCountry onCountryChange={onCountryChange} />
          <DateRangePicker />
          <PriceRangeSelector onPriceRangeChange={onPriceRangeChange} />
        </div>

        {/* Button */}
        <div className="lg:w-1/4 flex justify-end">
          <button
            onClick={openModal}
            className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            + Add new property
          </button>
        </div>
      </div>
      <AddPropertyModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default PropertiesFilter;
