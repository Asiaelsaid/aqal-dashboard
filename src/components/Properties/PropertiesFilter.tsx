import { useState } from "react";
import AddPropertyModal from "./AddProperty/AddPropertyModal";
import SelectCountry from "./Filters/SelectCountry";
import SubHeading from "@components/UI/SubHeading";


const PropertiesFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "",
    imgURL: "",
  });
  // const [selectedPriceRange, setSelectedPriceRange] = useState(null);
console.log(selectedCountry);

  // Handlers
  const onCountryChange = (category: { name: string; imgURL: string }) => {
    setSelectedCountry(category);
  };
  // const onPriceRangeChange = (priceRange: {
  //   id: number;
  //   label: string;
  //   value: [number, number];
  // }) => {
  //   setSelectedPriceRange(priceRange);
  // };
  const openModal = () => setIsOpen(true);

  return (
    <div className=" p-4  space-y-6">
      <SubHeading subHeading="Manage all your properties in one place"/>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-4 sm:justify-between lg:flex-row lg:items-center lg:space-x-8">
        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto lg:w-2/3">
          <SelectCountry onCountryChange={onCountryChange} />
          {/* <DateRangePicker /> */}
          {/* <PriceRangeSelector onPriceRangeChange={onPriceRangeChange} /> */}
        </div>

        {/* Button */}
        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <button
            onClick={openModal}
            className="px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
