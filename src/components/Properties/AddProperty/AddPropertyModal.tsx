import useAxios from "@config/axios.config";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useCustomQuery from "@hooks/useCustomQuery";
import { IErrorrEsponse, PropertyData } from "@interfaces";
import { useState } from "react";
import toast from "react-hot-toast";
import PropertyTypeSelect from "./PropertyTypeSelect";
import ConditionSelect from "./ConditionSelect";
import { FaTimes } from "react-icons/fa";
import { AxiosError } from "axios";
import PropertyManagerSelect from "./PropertyManagerSelect";
import PropertyOwnerSelect from "./PropertyOwnerSelect";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddPropertyModal: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState<PropertyData>({
    name: "",
    property_type: Number(""),
    description: "",
    conditions: Number(""),
    location: "Nairobi, Kenya",
    total_units: "",
    vacant_units: "",
    sold_units: "",
    unit_types: "",
    property_level: "",
    property_manager: Number(""),
    user: Number(""), // property owner
    amenities: [],
    common_areas: [],
  });
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await axiosInstance.post(
        "/owners/property/create/",
        formData
      );
  
      if (data?.status === 201) {
        setIsOpen(false);
        toast.success("Property added successfully!");
        setFormData({
          name: "",
          property_type: Number(""),
          description: "",
          conditions: Number(""),
          location: "Nairobi, Kenya",
          total_units: "",
          vacant_units: "",
          sold_units: "",
          unit_types: "",
          property_level: "",
          property_manager: Number(""),
          user: Number(""),
          amenities: [],
          common_areas: [],
        });
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorrEsponse>;
      toast.error(`${errorObj.response?.data?.message || "Validation failed"}`, {
        duration: 3000,
        position: "top-center",
      });
    }
  };
  
  const { data } = useCustomQuery({
    queryKey: ["propertyFields"],
    url: "/owners/property/fields/",
  });
  const fieldsData = data?.data;
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
        property_manager: selectedManager?.id || null, // Ensure fallback to null if not found
      });
    } else if (name === "property_owners") {
      // Handle property owner selection
      const selectedOwner = fieldsData?.property_owners.find(
        (owner: { id: number }) => owner.id === Number(value)
      );
      setFormData({
        ...formData,
        user: selectedOwner?.id || null, // Ensure fallback to null if not found
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
  
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="fixed  top-0 right-0 flex w-screen h-screen items-center justify-center bg-black/30  transition duration-500 ease-out data-[closed]:opacity-0 backdrop-blur-sm"
    >
      <DialogPanel className="w-full sm:w-3/4 top-0 right-0 lg:max-w-xl h-full max-h-screen bg-white shadow-xl transform lg:translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto">
        <DialogTitle className="text-lg font-medium text-gray-700 p-4 border-b border-gray-200 flex justify-between items-center">
          Add New Property
          <div className="flex justify-between items-center p-4 ">
            <button onClick={() => setIsOpen(false)} className="text-gray-600">
              <FaTimes />
            </button>
          </div>
        </DialogTitle>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 flex-1 overflow-y-auto max-h-[calc(100vh-10rem)]"
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
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            {fieldsData?.property_managers && (
              <PropertyManagerSelect
                formData={formData}
                setFormData={setFormData}
              />
            )}
          </div>

          <div>
            {fieldsData?.property_owners && (
              <PropertyOwnerSelect
                formData={formData}
                setFormData={setFormData}
              />
            )}
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
                      onChange={(e) => handleCheckboxChange(e, "amenities")}
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
            <h3 className="font-semibold text-gray-700 mb-2">Common Areas</h3>
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
                      onChange={(e) => handleCheckboxChange(e, "common_areas")}
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
              type="button"
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
      </DialogPanel>
    </Dialog>
  );
};

export default AddPropertyModal;
