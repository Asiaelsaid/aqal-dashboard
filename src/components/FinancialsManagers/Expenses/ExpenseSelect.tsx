import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { Fragment } from "react";
import { IExpenseData } from "@interfaces";

interface IExpenseSelectProps {
  formData: IExpenseData;
  setFormData: React.Dispatch<React.SetStateAction<IExpenseData>>;
}

const expenseTypes = [
  { id: "maintenance", name: "Maintenance" },
  { id: "utilities", name: "Utilities" },
  { id: "management_fees", name: "Management Fees" },
  { id: "other", name: "Other" },
];

const ExpenseSelect: React.FC<IExpenseSelectProps> = ({
  formData,
  setFormData,
}) => {
  const selectedExpenseType = expenseTypes.find(
    (expense) => expense.id === formData.expense_type
  );

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor="expenseType"
      >
        Expense Type
      </label>
      <Listbox
        as="div"
        value={formData.expense_type}
        onChange={(value) => setFormData({ ...formData, expense_type: value })}
      >
        {({ open }) => (
          <div className="relative">
            <ListboxButton className="w-full border border-gray-300 rounded-lg p-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500">
              <span>
                {selectedExpenseType
                  ? selectedExpenseType.name
                  : "Select Expense Type"}
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
              {expenseTypes.map((expense) => (
                <ListboxOption
                  key={expense.id}
                  value={expense.id}
                  as={Fragment}
                >
                  {({ selected, disabled }) => (
                    <li
                      className={`cursor-pointer select-none p-2 list-none transition-colors hover:bg-purple-400 hover:text-white ${
                        selected ? "bg-purple-500 text-white" : "text-gray-700"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {expense.name}
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

export default ExpenseSelect;
