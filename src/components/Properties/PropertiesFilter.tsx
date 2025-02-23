import { useEffect, useState } from "react";
import AddPropertyModal from "./AddProperty/AddPropertyModal";
import SelectCountry from "./Filters/SelectCountry";
import SubHeading from "@components/UI/SubHeading";
import { FaPlus } from "react-icons/fa6";

interface IProps {
  locations: string[];
  onSelectLocation: (location: string) => void;
}
const PropertiesFilter : React.FC<IProps> = ({locations,onSelectLocation}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("tesr",locations);

 
  // const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  // const onPriceRangeChange = (priceRange: {
  //   id: number;
  //   label: string;
  //   value: [number, number];
  // }) => {
  //   setSelectedPriceRange(priceRange);
  // };
  const openModal = () => setIsOpen(true);
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    const storedRole: string = localStorage.getItem("role") as string;
    setRole(storedRole);
  }, []);
  return (
    <div className="space-y-6">
      <SubHeading subHeading="Manage all your properties in one place" />
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-4 sm:justify-between lg:flex-row lg:items-center lg:space-x-8">
        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto lg:w-2/3">
          <SelectCountry locations={locations} onCountryChange={onSelectLocation} />
          {/* <DateRangePicker /> */}
          {/* <PriceRangeSelector onPriceRangeChange={onPriceRangeChange} /> */}
        </div>

        {/* Button */}
        {role === "admin" && (
          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <button
              onClick={openModal}
              className="px-6 py-3 flex items-center text-sm font-medium text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              <FaPlus className="mr-2" /> Add new property
            </button>
          </div>
        )}
      </div>
      <AddPropertyModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default PropertiesFilter;
