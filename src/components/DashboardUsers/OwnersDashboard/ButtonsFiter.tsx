// // interface IProps {}

// // const ButtonsFiter: React.FC<IProps> = () => {
// //     return  <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
// //     <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
// //      1 month
// //     </button>
// //     <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
// //       3 months
// //     </button>
   
// //   </div>
// // };

// // export default ButtonsFiter;

// interface IProps {
//   filter: "1month" | "3months";
//   setFilter: (filter: "1month" | "3months") => void;
// }

// const ButtonsFiter: React.FC<IProps> = ({ filter, setFilter }) => {
//   return (
//     <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
//       <button
//         className={`px-4 py-2 text-sm font-medium border ${
//           filter === "1month" ? "bg-purple-500 text-white" : "bg-white text-gray-700"
//         } rounded-l-md hover:bg-gray-100 focus:ring-2 focus:ring-purple-500`}
//         onClick={() => setFilter("1month")}
//       >
//         1 month
//       </button>
//       <button
//         className={`px-4 py-2 text-sm font-medium border ${
//           filter === "3months" ? "bg-purple-500 text-white" : "bg-white text-gray-700"
//         } rounded-r-md hover:bg-gray-100 focus:ring-2 focus:ring-purple-500`}
//         onClick={() => setFilter("3months")}
//       >
//         3 months
//       </button>
//     </div>
//   );
// };

// export default ButtonsFiter;
interface IProps {
  selectedTimeframe: '1' | '3';
  onSelect: (timeframe: '1' | '3') => void;
}

const ButtonsFiter: React.FC<IProps> = ({ selectedTimeframe, onSelect }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        onClick={() => onSelect('1')}
        className={`px-4 py-2 text-sm font-medium border ${
          selectedTimeframe === '1'
            ? 'bg-purple-500 text-white border-purple-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        } rounded-l-md`}
      >
        1 Month
      </button>
      <button
        onClick={() => onSelect('3')}
        className={`px-4 py-2 text-sm font-medium border ${
          selectedTimeframe === '3'
            ? 'bg-purple-500 text-white border-purple-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        } rounded-r-md`}
      >
        3 Months
      </button>
    </div>
  );
};
export default ButtonsFiter;
