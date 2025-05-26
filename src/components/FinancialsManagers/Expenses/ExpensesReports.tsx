import Pagination from "@components/Properties/Pagination";
import useCustomQuery from "@hooks/useCustomQuery";
import { useMemo, useState } from "react";
import AddExpenseModal from "./AddExpenseModal";
import { FaPlus } from "react-icons/fa6";

interface ExpenseItem {
  expense_type: string;
  total: number;
}

interface PropertyExpense {
  property_id: number;
  property_name: string;
  expenses: ExpenseItem[];
  total_expenses: number;
}

const ExpensesReports = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const openModal = () => setIsOpen(true);

  const { data, refetch } = useCustomQuery({
    queryKey: ["expensesSummary"],
    url: "/managers/expenses/summary/",
  });

  const expensesData: PropertyExpense[] = data?.data || [];

  const totalPages = Math.ceil(expensesData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const paginatedData = expensesData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  const handleExpenseAdded = () => {
    refetch();
  };

  const allExpenseTypes = useMemo(() => {
    const types = new Set<string>();
    expensesData.forEach((item) => {
      (item.expenses || []).forEach((expense) => {
        types.add(expense.expense_type);
      });
    });
    return Array.from(types);
  }, [expensesData]);

console.log("allExpenseTypes", expensesData);

  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h4 className="text-lg font-semibold">Expenses Reports</h4>
          <p className="text-gray-500 text-sm">Keep track of your expense</p>
        </div>
        <button
          onClick={openModal}
          className="px-6 py-3 flex items-center text-sm font-medium text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700"
        >
          <FaPlus className="mr-2" /> Add new expense
        </button>
      </div>

      <table className="mt-4 w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
        <thead className="text-xs text-gray-500 bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b text-left">Property Name</th>

            {allExpenseTypes.map((type) => (

              <th key={`head-${type}`} className="px-6 py-3 border-b text-left capitalize">
                {type.replace(/_/g, " ")}
              </th>
            ))}
            <th className="px-6 py-3 border-b text-left">Total Expenses</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, idx) => {
              const expenseMap = new Map<string, number>();
              (item.expenses || []).forEach((exp) => {
                expenseMap.set(exp.expense_type, exp.total);
              });

              return (
                <tr key={`row-${idx}`}>
                  <td className="px-6 py-4 border-b">{item.property_name}</td>
                  {allExpenseTypes.map((type) => (
                    <td key={`cell-${idx}-${type}`} className="px-6 py-4 border-b whitespace-nowrap">
                      {expenseMap.get(type) ?? 0}
                    </td>
                  ))}
                  <td className="px-6 py-4 border-b">{item.total_expenses}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={allExpenseTypes.length + 2} className="px-6 py-4 text-center">
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
