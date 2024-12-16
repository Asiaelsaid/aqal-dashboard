// import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
// import { PropertyData } from "@interfaces";
// import { Fragment } from "react";
// import { HiChevronDown } from "react-icons/hi";

// interface ConditionSelectProps {
//   formData: PropertyData;
//   setFormData: React.Dispatch<React.SetStateAction<PropertyData>>;
// }

// const ConditionSelect: React.FC<ConditionSelectProps> = ({
//   formData,
//   setFormData,
// }) => {
//   const conditions = ["Good", "Average", "Needs Repair"];

//   return (
//     <div>
//       <label className="block text-gray-700 font-medium mb-1">Condition</label>
//       <Listbox
//         as="div"
//         value={formData.condition}
//         onChange={(value) => setFormData({ ...formData, condition: value })}
//       >
//         {({ open }) => (
//           <div className="relative">
//             {/* Dropdown Trigger */}
//             <ListboxButton className="w-full border border-gray-300 rounded-lg p-2 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-purple-500">
//               <span>{formData.condition || "Select Condition"}</span>
//               <HiChevronDown
//                 className={`h-5 w-5 text-gray-500 transform transition-transform duration-500 ${
//                   open ? "rotate-180" : "rotate-0"
//                 }`}
//               />
//             </ListboxButton>

//             {/* Dropdown Options with Animation */}
//             <ListboxOptions
//               className={`absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 transform origin-top ${
//                 open
//                   ? "opacity-100 scale-y-100 translate-y-0"
//                   : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
//               }`}
//             >
//               {conditions.map((condition, idx) => (
//                 <ListboxOption key={idx} value={condition} as={Fragment}>
//                   {({ selected, disabled }) => (
//                     <li
//                       className={`cursor-pointer select-none p-2 list-none ${
//                         selected ? "bg-purple-500 text-white" : "text-gray-700"
//                       } ${disabled ? "font-semibold" : ""}`}
//                     >
//                       {condition}
//                     </li>
//                   )}
//                 </ListboxOption>
//               ))}
//             </ListboxOptions>
//           </div>
//         )}
//       </Listbox>
//     </div>
//   );
// };

// export default ConditionSelect;
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { PropertyData } from "@interfaces";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";

interface ConditionSelectProps {
  formData: PropertyData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const ConditionSelect: React.FC<ConditionSelectProps> = ({
  formData,
  setFormData,
}) => {
  const conditions = ["Good", "Average", "Needs Repair"];

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">Condition</label>
      <Listbox
        as="div"
        value={formData.condition}
        onChange={(value) => setFormData({ ...formData, condition: value })}
      >
        {({ open }) => (
          <div className="relative">
            {/* Dropdown Trigger */}
            <ListboxButton className="w-full border border-gray-300 rounded-lg p-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500">
              <span>{formData.condition || "Select Condition"}</span>
              <HiChevronDown
                className={`h-5 w-5 text-gray-500 transform transition-transform duration-500 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </ListboxButton>

            {/* Dropdown Options with Animation */}
            <ListboxOptions
              static
              className={`absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-auto transform transition-all duration-500 ${
                open
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
              } origin-top`}
            >
              {conditions.map((condition, idx) => (
                <ListboxOption key={idx} value={condition} as={Fragment}>
                  {({ selected, disabled }) => (
                    <li
                      className={`cursor-pointer select-none p-2 list-none transition-colors hover:bg-purple-400 hover:text-white ${
                        selected ? "bg-purple-500 text-white" : "text-gray-700"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {condition}
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

export default ConditionSelect;
