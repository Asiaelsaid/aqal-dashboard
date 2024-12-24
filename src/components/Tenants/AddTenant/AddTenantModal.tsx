import axiosInstance from "@config/axios.config";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PropertyData } from "@interfaces";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddTenantModal: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState<PropertyData>({
    name: "",
    property_type: Number(""),
    description: "",
    conditions: [],
    location: "Nairobi, Kenya",
    total_units: "",
    vacant_units: "",
    sold_units: "",
    unit_types: "",
    property_level: "",
    property_manager: "",
    amenities: [],
    common_areas: [],
  });
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await axiosInstance.post(
        "/managers/assign-tenant-to-unit/",
        formData
      );
      if (data.satus === 201) {
        toast.success("Property added successfully!");
        setFormData({
          name: "",
          property_type: Number(""),
          description: "",
          conditions: [],
          location: "Nairobi, Kenya",
          total_units: "",
          vacant_units: "",
          sold_units: "",
          unit_types: "",
          property_level: "",
          property_manager: "",
          amenities: [],
          common_areas: [],
        });
        setIsOpen(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add property. Please try again.");
    }
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
            <DialogPanel
              transition
              className="w-screen max-w-lg duration-1000 ease-out"
            >
              <div className="flex h-full flex-col bg-white shadow-xl">
                <DialogTitle className="text-lg font-medium text-gray-700 px-4 py-4 100 border-b border-gray-200 flex justify-between items-center">
                  Add new tenant
                  <div className="flex justify-between items-center p-4 ">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </DialogTitle>
                <form className="p-6 flex flex-col" onSubmit={handleSubmit}>
                  <div className=" space-y-6 flex-grow">
                    <div>
                      <label
                        htmlFor="property"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Choose Property
                      </label>
                      <select
                        id="property"
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                      >
                        <option>Gera Apartment</option>
                        <option>Other Property</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="tenantName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tenant name
                      </label>
                      <input
                        type="text"
                        id="tenantName"
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                        placeholder="Tim Smith"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="unitNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Unit number
                      </label>
                      <input
                        type="text"
                        id="unitNumber"
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                        placeholder="01"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="documents"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upload documents
                        <span className="block text-sm text-gray-500">
                          Upload both the TIMS report and the lease contract
                        </span>
                      </label>
                      <div className="mt-2 border border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <label
                          htmlFor="documents"
                          className="cursor-pointer text-purple-500 hover:text-purple-700"
                        >
                          Click to upload or drag and drop
                        </label>
                        <input type="file" id="documents" className="hidden" />
                        <p className="text-sm text-gray-500 mt-1">
                          SVG, PNG, JPG, or GIF (max. 800x400px)
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="outstandingPayment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Outstanding payment
                      </label>
                      <input
                        type="number"
                        id="outstandingPayment"
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                        placeholder="e.g. 200.00"
                      />
                    </div>
                  </div>
                  <div className="flex items-center  justify-between gap-2 mt-8">
                    <button
                      className="w-full  text-gray-700 border rounded-lg p-2 hover:bg-purple-600 hover:text-white transition"
                      onClick={() => setIsOpen(false)}
                    >
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

export default AddTenantModal;
