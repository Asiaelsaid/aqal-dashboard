import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import PropertyTypeSelect from "./PropertyTypeSelect";
import ConditionSelect from "./ConditionSelect";
import { PropertyData } from "@interfaces";
import useCustomQuery from "@hooks/useCustomQuery";
import axiosInstance from "@config/axios.config";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const AddPropertyModal: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const { data, isError } = useCustomQuery({
    queryKey: ["propertyFields"],
    url: "/owners/property/fields/",
  });
  const fieldsData = data?.data;
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

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "amenities" | "common_areas"
  ) => {
    const value = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.checked
        ? [...prev[key], value]
        : prev[key].filter((id) => id !== value),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "property_manager") {
      const selectedManager = fieldsData?.property_managers.find(
        (manager: { id: number }) => manager.id === Number(value)
      );
      setFormData({
        ...formData,
        property_manager: selectedManager.id || null,
      });
    } else if (
      name === "total_units" ||
      name === "property_level" ||
      name === "sold_units" ||
      name === "vacant_units"
    ) {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await axiosInstance.post(
        "/owners/property/create/",
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

  if (isError) {
    toast.error("Failed to load property fields. Please refresh the page.");
  }

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
                  Add New Property
                  <div className="flex justify-between items-center p-4 ">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
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
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="White stone apartments"
                    />
                  </div>
                  <div>
                    {fieldsData?.property_types?.length > 0 ? (
                      <PropertyTypeSelect
                        formData={formData}
                        setFormData={setFormData}
                        propertyTypes={fieldsData?.property_types}
                      />
                    ) : (
                      <p>Loading property types...</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Property Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                      placeholder="Describe the property"
                    />
                  </div>
                  <div>
                    {fieldsData?.conditions ? (
                      <ConditionSelect
                        formData={formData}
                        setFormData={setFormData}
                        condition={fieldsData?.conditions}
                      />
                    ) : (
                      <p>Loading conditions...</p>
                    )}
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
                  <hr />
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Total Units
                    </label>
                    <input
                      type="text"
                      name="total_units"
                      value={formData.total_units}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Vacant Units
                    </label>
                    <input
                      type="text"
                      name="vacant_units"
                      value={formData.vacant_units}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Sold Units
                    </label>
                    <input
                      type="text"
                      name="sold_units"
                      value={formData.sold_units}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Types of units
                    </label>
                    <input
                      type="text"
                      placeholder="Types of units"
                      name="unit_types"
                      value={formData.unit_types}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Property Level
                    </label>
                    <input
                      type="text"
                      name="property_level"
                      value={formData.property_level}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Property Manager
                    </label>
                    <select
                      name="property_manager"
                      value={formData.property_manager}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                    >
                      <option value="">Select a Manager</option>
                      {fieldsData?.property_managers?.map(
                        (manager: {
                          id: number;
                          first_name: string;
                          last_name: string;
                        }) => (
                          <option
                            key={manager.id}
                            value={manager.id}
                            // value={`${manager.first_name} ${manager.last_name}`}
                          >
                            {manager.first_name} {manager.last_name}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <hr />
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Property Amenities
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Check the amenities that this property offers
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {fieldsData?.amenities?.map(
                        (amenity: { id: number; name: string }) => (
                          <label key={amenity.id} className="flex items-center">
                            <input
                              type="checkbox"
                              name="amenities"
                              value={amenity.id}
                              checked={formData.amenities.includes(amenity.id)}
                              onChange={(e) =>
                                handleCheckboxChange(e, "amenities")
                              }
                              className="mr-2"
                            />
                            {amenity.name}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                  <hr />
                  {/* Common Areas */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Common Areas
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Check the property common areas that the property has
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {fieldsData?.common_areas?.map(
                        (area: { id: number; name: string }) => (
                          <label key={area.id} className="flex items-center">
                            <input
                              type="checkbox"
                              name="common_areas"
                              value={area.id}
                              checked={formData.common_areas.includes(area.id)}
                              onChange={(e) =>
                                handleCheckboxChange(e, "common_areas")
                              }
                              className="mr-2"
                            />
                            {area.name}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between gap-2">
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

export default AddPropertyModal;
