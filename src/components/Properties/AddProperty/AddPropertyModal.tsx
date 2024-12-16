import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import PropertyTypeSelect from "./PropertyTypeSelect";
import ConditionSelect from "./ConditionSelect";
import { PropertyData } from "@interfaces";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddPropertyModal: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState<PropertyData>({
    propertyName: "",
    propertyType: "Apartment",
    propertyDescription: "",
    condition: "Good",
    location: "Nairobi, Kenya",
    totalUnits: 0,
    vacantUnits: 0,
    soldUnits: 0,
    unitType: "",
    propertyManager: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Property Data Submitted:", formData);
    alert("Property Added Successfully!");
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="w-screen max-w-lg">
              <div className="flex h-full flex-col bg-white shadow-xl">
                <DialogTitle className="text-lg font-medium text-gray-700 px-4 py-4 100 border-b border-gray-200 flex justify-between items-center">
                  Add New Property
                </DialogTitle>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 p-4  flex-1 overflow-y-auto"
                >
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Property Name
                    </label>
                    <input
                      type="text"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="White stone apartments"
                    />
                  </div>

                  <div>
                    <PropertyTypeSelect
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Property Description
                    </label>
                    <textarea
                      name="propertyDescription"
                      value={formData.propertyDescription}
                      // onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                      placeholder="Describe the property"
                    />
                  </div>

                  <div>
                    <ConditionSelect
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                      placeholder="Nairobi, Kenya"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Total Units
                      </label>
                      <input
                        type="number"
                        name="totalUnits"
                        value={formData.totalUnits}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Vacant Units
                      </label>
                      <input
                        type="number"
                        name="vacantUnits"
                        value={formData.vacantUnits}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Sold Units
                    </label>
                    <input
                      type="number"
                      name="soldUnits"
                      value={formData.soldUnits}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Property Manager
                    </label>
                    <input
                      type="text"
                      name="propertyManager"
                      value={formData.propertyManager}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <button className="w-full  text-gray-700 border rounded-lg p-2 hover:bg-purple-600 hover:text-white transition">
                      cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-700 transition"
                    >
                   save
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddPropertyModal;
