import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateRangePicker: React.FC = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <div className="relative max-w-56 mt-8">
      <Datepicker
        inputClassName="relative w-full flex items-center rounded-md bg-white py-3.5 pl-3 pr-10  text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-purple-500 sm:text-sm sm:leading-6 dark:bg-white dark:text-gray-500 dark:ring-gray-300"
        // inputClassName="relative w-full flex items-center rounded-md bg-white py-3.5 pl-3 pr-10 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-purple-500 sm:text-sm sm:leading-6"
        toggleClassName="absolute  rounded-r-lg  right-0 top-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        placeholder="Date Range"
        primaryColor="purple"
        useRange={false}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
};

export default DateRangePicker;
