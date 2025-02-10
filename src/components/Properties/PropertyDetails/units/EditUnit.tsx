import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useCustomQuery from "@hooks/useCustomQuery";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import SelectTenant from "./SelectTenant";
import useAxios from "@config/axios.config";
import toast from "react-hot-toast";
import { IErrorrEsponse } from "@interfaces";
import { AxiosError } from "axios";

interface IProps {
  id: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onRefetch: () => void;
}

const EditUnit: React.FC<IProps> = ({ id, isOpen, setIsOpen, onRefetch }) => {
  const axiosInstance = useAxios();
  const { data } = useCustomQuery({
    queryKey: ["UnitDetails"],
    url: `/owners/units/${id}/details`,
  });
  const unit = data?.data;
  const [formData, setFormData] = useState({
    unit_number: "",
    unit_level: "",
    // status: "",
    tenant: 0,
    is_rented: false,
    // outstanding_payment: null,
    unit_property: "",
  });
  useEffect(() => {
    if (unit) {
      setFormData({
        unit_number: unit.unit_number || "",
        unit_level: unit.unit_level || "",
        // status: unit.status || "",
        tenant: unit.tenant || null,
        is_rented: unit.is_rented || false,
        // outstanding_payment: unit.outstanding_payment || null,
        unit_property: unit.unit_property || "",
      });
    }
  }, [unit]);
  const handleTenantChange = (selectedTenant: number) => {
    setFormData((prev) => ({ ...prev, tenant: selectedTenant }));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.patch(
        `/owners/units/${id}/`,
        formData
      );
      if (response.status === 200) {
        toast.success("Unit updated successfully");
        onRefetch();
        setIsOpen(false);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorrEsponse>;
      toast.error(`${errorObj.response?.data?.message}`, {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="fixed  top-0 right-0 flex w-screen h-screen items-center justify-center bg-black/30  transition duration-500 ease-out data-[closed]:opacity-0 backdrop-blur-sm"
    >
      <DialogPanel className="w-full sm:w-3/4 lg:top-0 lg:right-0 lg:max-w-xl h-full max-h-screen bg-white shadow-xl transform lg:translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto">
        <DialogTitle className="text-lg font-medium text-gray-700 p-4 border-b border-gray-200 flex justify-between items-center">
          Edit Unit
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
              Unit Number
            </label>
            <input
              type="text"
              name="unit_number"
              value={formData.unit_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Unit Level */}
          <div>
            <label className="block text-gray-700 font-medium">
              Unit Level
            </label>
            <input
              type="text"
              name="unit_level"
              value={formData.unit_level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <SelectTenant
            selectedTenant={formData.tenant}
            onSelectTenant={handleTenantChange}
          />

          {/* Is Rented */}
          <div className="flex items-center gap-2">
            <label className="block text-gray-700 font-medium">
              Is Rented?
            </label>
            <input
              type="checkbox"
              name="is_rented"
              checked={formData.is_rented}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_rented: e.target.checked,
                }))
              }
            />
          </div>

          {/* Unit Property */}
          <div>
            <label className="block text-gray-700 font-medium">
              Unit Property
            </label>
            <input
              type="text"
              name="unit_property"
              value={formData.unit_property}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full text-gray-700 border rounded-lg p-2 hover:bg-purple-600 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default EditUnit;
