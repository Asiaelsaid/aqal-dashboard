import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { PropertyData } from "@interfaces";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";

interface ConditionSelectProps {
  formData: PropertyData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyData>>;
  condition: {
    id: number;
    name: string;
  }[];
}

const ConditionSelect: React.FC<ConditionSelectProps> = ({
  formData,
  setFormData,
  condition
}) => {
  const selectedConditions = condition.filter(condition =>
    formData?.conditions?.includes(condition.id)
  );

  const toggleCondition = (id: number) => {
    if (formData.conditions?.includes(id)) {
      setFormData({
        ...formData,
        conditions: formData.conditions?.filter((conditionId) => conditionId !== id),
      });
    } else {
      setFormData({
        ...formData,
        conditions: [...formData.conditions, id],
      });
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">Condition</label>
      <Listbox as="div" value={formData.conditions} onChange={() => {}}>
        {({ open }) => (
          <div className="relative">
            <ListboxButton className="w-full border border-gray-300 rounded-lg p-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500">
              <span>
                {selectedConditions.length
                  ? selectedConditions.map((condition) => condition.name).join(", ")
                  : "Select Property Condition"}
              </span>
              <HiChevronDown
                className={`h-5 w-5 text-gray-500 transform transition-transform duration-500 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </ListboxButton>
            <ListboxOptions
              className={`absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-auto transform transition-all duration-500 ${
                open
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
              } origin-top`}
            >
              {condition?.map((condition) => (
                <ListboxOption key={condition.id} value={condition.id} as={Fragment}>
                  {({ selected, active }) => (
                    <li
                      onClick={() => toggleCondition(condition.id)}
                      className={`cursor-pointer select-none p-2 list-none transition-colors hover:bg-purple-400 hover:text-white ${
                        selected ? "bg-purple-500 text-white" : "text-gray-700"
                      } ${active ? "bg-purple-100" : ""}`}
                    >
                      {condition.name}
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
