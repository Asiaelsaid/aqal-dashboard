// interface IProps {
//   onFilterChange: (range: string) => void;
// }

// const RevenueExpensesFilter: React.FC<IProps> = ({ onFilterChange }) => {
//   return (
//     <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
//       {["12 months", "30 days", "7 days", "24 hours"].map((range) => (
//         <button
//           key={range}
//           className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500"
//           onClick={() => onFilterChange(range)}
//         >
//           {range}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default RevenueExpensesFilter;

interface IProps {}

const RevenueExpensesFilter: React.FC<IProps> = () => {
  return (
    <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
      <button className="px-4 py-2 text-sm font-medium text-gray-700   rounded-l-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
        12 months
      </button>
      <button className="px-4 py-2 text-sm font-medium text-gray-700   hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
        30 days
      </button>
      <button className="px-4 py-2 text-sm font-medium text-gray-700    hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
        7 days
      </button>
      <button className="px-4 py-2 text-sm font-medium text-gray-700    rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
        24 hours
      </button>
    </div>
  );
};

export default RevenueExpensesFilter;
