import Pagination from "@components/Properties/Pagination";
import useCustomQuery from "@hooks/useCustomQuery";
import { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";
import { FaPlus } from "react-icons/fa6";
// import { FaArrowDown } from "react-icons/fa6";

interface IExpense {
  property_name: string;
  maintenance_amount: number;
  utilities_amount: number;
  management_fees_amount: number;
  other_amount: number;
  total_expenses: number;
}

const ExpensesReports = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const { data, refetch } = useCustomQuery({
    queryKey: ["expensesSummary"],
    url: "/managers/expenses/summary/",
  });
  const expensesData: IExpense[] = data?.data || [];
  const totalPages = Math.ceil(expensesData.length / itemsPerPage);
  // Calculate paginated data
  const startIndex = currentPage * itemsPerPage;
  const paginatedData = expensesData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };
  const handleExpenseAdded = () => {
    refetch();
  };
  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row md:flex-row sm:space-x-4 mt-2 sm:space-y-0 space-y-6 sm:justify-between lg:flex-row lg:items-center lg:space-x-8">
        <div>
          <h4 className="text-lg font-semibold">Expenses Reports</h4>
          <p className="text-gray-500 text-sm">Keep track of your expense</p>
        </div>

        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <button
            onClick={openModal}
            className="px-6 py-3 flex items-center text-sm font-medium text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700"
          >
            <FaPlus className="mr-2" /> Add new expense
          </button>
        </div>
      </div>
      <table className="mt-4 w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
        <thead className="text-xs text-gray-500 bg-gray-100">
          <tr>
            {/* <th className="px-6 py-3 border-b text-left flex items-center">
              Date and time <FaArrowDown className="ml-1" />
            </th> */}
            <th className="px-6 py-3 border-b text-left">Propperty name</th>
            <th className="px-6 py-3 border-b text-left">Maintenance</th>
            <th className="px-6 py-3 border-b text-left">Utilities</th>
            <th className="px-6 py-3 border-b text-left">Management fees</th>
            <th className="px-6 py-3 border-b text-left">Other</th>
            <th className="px-6 py-3 border-b text-left">Total Expenses</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.length > 0 ? (
            paginatedData.map((expense: IExpense, index: number) => (
              <tr key={index}>
                {/* <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                          {expense.date}
                        </td> */}
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {expense.property_name}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {expense.maintenance_amount}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {expense.utilities_amount}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {expense.management_fees_amount}
                </td>
                <td className="px-6 py-4 border-b text-left ">
                  {expense.other_amount}
                </td>
                <td className="px-6 py-4 border-b text-left ">
                  {expense.total_expenses}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center">
                No expenses data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      )}
      <AddExpenseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onExpenseAdded={handleExpenseAdded}
      />
    </div>
  );
};

export default ExpensesReports;
