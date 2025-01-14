// interface ButtonGroupProps {
//   onStatusChange: (status: string) => void;
// }
// const ButtonGroup: React.FC<ButtonGroupProps> = ({ onStatusChange }) => {
  
//   const statusOptions = [
//     { value: "", label: "All" },
//     { value: "pending", label: "Pending" },
//     { value: "in_progress", label: "In Progress" },
//     { value: "completed", label: "Completed" },
//     { value: "cancelled", label: "Cancelled" },
//   ];
//   return (
//     <div className="  mt-4 inline-flex rounded-md shadow-sm" role="group">
//       {statusOptions.map((status, index) => (
        // <button
        //   key={status.value}
        //   onClick={() => onStatusChange(status.value)}
        //   className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 ${
        //     index === 0
        //       ? "rounded-l-md"
        //       : index === statusOptions.length - 1
        //       ? "rounded-r-md"
        //       : ""
        //   } hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500`}
        // >
        //   {status.label}
        // </button>
//       ))}
//     </div>
//   );
// };

// export default ButtonGroup;
interface ButtonGroupProps {
  onStatusChange: (status: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({  onStatusChange }) => {
  const statusOptions = [
    { value: "", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
      {statusOptions.map((status, index) => (
       <button
       key={status.value}
       onClick={() => onStatusChange(status.value)}
       className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 ${
         index === 0
           ? "rounded-l-md"
           : index === statusOptions.length - 1
           ? "rounded-r-md"
           : ""
       } hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500`}
     >
       {status.label}
     </button>
      ))}
    </div>
  );
};
export default ButtonGroup