import { IExpenseData } from "@interfaces";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface DateRangePickerProps {
  formData: IExpenseData;
  setFormData: React.Dispatch<React.SetStateAction<IExpenseData>>;
}

const SelectedDatePicker: React.FC<DateRangePickerProps> = ({
  formData,
  setFormData,
}) => {
  const [value, setValue] = useState({
    startDate: formData.date ? new Date(formData.date) : null, // Initialize startDate if formData already has a date
    endDate: null,
  });
  const handleDateChange = (newValue: any) => {
    setValue(newValue);
    // Update formData with the selected date range
    setFormData({
      ...formData,
      date: newValue.startDate
        ? newValue.startDate.toISOString().split("T")[0]
        : "", // Store the date as ISO string
    });
  };
  return (
    <div className="relative w-full mt-8">
      <Datepicker
        inputClassName="relative w-full flex items-center rounded-md bg-white py-3.5 pl-3 pr-10  text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-purple-500 sm:text-sm sm:leading-6 dark:bg-white dark:text-gray-500 dark:ring-gray-300"
        // inputClassName="relative w-full flex items-center rounded-md bg-white py-3.5 pl-3 pr-10 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-purple-500 sm:text-sm sm:leading-6"
        toggleClassName="absolute  rounded-r-lg  right-0 top-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        placeholder="Date"
        primaryColor="purple"
        asSingle={true}
        useRange={false}
        value={value}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default SelectedDatePicker;
