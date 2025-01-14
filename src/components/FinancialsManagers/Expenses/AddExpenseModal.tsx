import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import useAxios from "@config/axios.config";
import { AxiosError } from "axios";
import PropertySelect from "./PropertySelect";
import { IExpenseData } from "@interfaces";
import ExpenseSelect from "./ExpenseSelect";
import SelectedDatePicker from "./SelectedDatePicker";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onExpenseAdded: () => void;
}

const AddExpenseModal: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  onExpenseAdded,
}) => {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState<IExpenseData>({
    property: Number(""),
    date: "",
    expense_type: "",
    amount: Number(""),
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post(
        "/managers/expenses/",
        formData
      );

      if (data.status === 201) {
        toast.success("Expense added successfully!");
        onExpenseAdded();
        setFormData({
          property: Number(""),
          date: "",
          expense_type: "",
          amount: Number(""),
          description: "",
        });
        setIsOpen(false);
      }
    } catch (error) {
      const errorObj = error as AxiosError<{ message: string }>;
      toast.error(`${errorObj.response?.data?.message}`, {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="fixed  top-0 right-0 flex w-screen h-screen items-center justify-center bg-black/30  transition duration-500 ease-out data-[closed]:opacity-0 backdrop-blur-sm"
    >
      <DialogPanel className="w-full sm:w-3/4 lg:top-0 lg:right-0 lg:max-w-lg h-full max-h-screen bg-white shadow-xl transform lg:translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto">
        <DialogTitle className="text-lg font-medium text-gray-700 px-4 py-4 border-b border-gray-200 flex justify-between items-center">
          Add New Expense
          <button onClick={() => setIsOpen(false)} className="text-gray-600">
            <FaTimes />
          </button>
        </DialogTitle>
        <form
          className="flex flex-col space-y-4 p-4 flex-1 overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6 flex-grow">
            <PropertySelect formData={formData} setFormData={setFormData} />

            <SelectedDatePicker formData={formData} setFormData={setFormData} />

            <ExpenseSelect formData={formData} setFormData={setFormData} />
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md text-gray-700"
                placeholder="e.g. 700.00"
                onChange={handleChange}
                value={formData.amount}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md text-gray-700"
                placeholder="e.g. Management fees"
                onChange={handleChange}
                value={formData.description}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-8">
            <button
              className="w-full text-gray-700 border rounded-lg p-2 hover:bg-purple-600 hover:text-white transition"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default AddExpenseModal;
