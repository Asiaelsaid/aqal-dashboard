import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IErrorrEsponse, ITenantData } from "@interfaces";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import PropertySelect from "./PropertySelect";
import { FiUploadCloud } from "react-icons/fi";
import useAxios from "@config/axios.config";
import { AxiosError } from "axios";
import TenantSelect from "./TenantSelect";
interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddTenantModal: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const axiosInstance = useAxios();
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState<ITenantData>({
    tenant: Number(""),
    property: Number(""),
    unit_number: "",
    outstanding_payment: "",
    tims_report: "",
    lease_contract: "",
  });
  // const handleFileChange = async (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   field: "tims_report" | "lease_contract"
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.result) {
  //         setFormData((prevState) => ({
  //           ...prevState,
  //           [field]: reader.result as string,
  //         }));
  //         toast.success(
  //           `${
  //             field === "tims_report" ? "TIMS Report" : "Lease Contract"
  //           } uploaded successfully!`
  //         );
  //       }
  //     };
  //     reader.onerror = () => {
  //       toast.error(
  //         `Failed to upload ${
  //           field === "tims_report" ? "TIMS Report" : "Lease Contract"
  //         }.`
  //       );
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   try {
  //     e.preventDefault();
  //     const { data } = await axiosInstance.post(
  //       "/managers/assign-tenant-to-unit/",
  //       formData
  //     );
  //     if (data.satus === 201) {
  //       toast.success("Tenant added successfully!");
  //       setFormData({
  //         tenant: "",
  //         property: Number(""),
  //         unit_number: "",
  //         outstanding_payment: "",
  //         tims_report: "",
  //         lease_contract: "",
  //       });
  //       setIsOpen(false);
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     toast.error("Failed to add Tenant. Please try again.");
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create a FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("tenant", formData.tenant.toString());
      formDataToSend.append("property", formData.property.toString());
      formDataToSend.append("unit_number", formData.unit_number);
      formDataToSend.append(
        "outstanding_payment",
        formData.outstanding_payment
      );
      if (formData.tims_report) {
        formDataToSend.append("tims_report", formData.tims_report);
      }
      if (formData.lease_contract) {
        formDataToSend.append("lease_contract", formData.lease_contract);
      }

      // Send the FormData object to the backend
      const { data } = await axiosInstance.post(
        "/managers/assign-tenant-to-unit/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.status === 201) {
        toast.success("Tenant added successfully!");
        setFormData({
          tenant: Number(""),
          property: Number(""),
          unit_number: "",
          outstanding_payment: "",
          tims_report: "",
          lease_contract: "",
        });
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

  const handleFileRead = (
    file: File,
    field: "tims_report" | "lease_contract"
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setFormData((prev) => ({
          ...prev,
          [field]: file,
        }));
        toast.success(
          `${
            field === "tims_report" ? "TIMS Report" : "Lease Contract"
          } uploaded successfully!`
        );
      }
    };
    reader.onerror = () => {
      toast.error(
        `Failed to upload ${
          field === "tims_report" ? "TIMS Report" : "Lease Contract"
        }.`
      );
    };
    reader.readAsDataURL(file);
  };
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    field: "tims_report" | "lease_contract"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileRead(e.dataTransfer.files[0], field);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="fixed  top-0 right-0 flex w-screen h-screen items-center justify-center bg-black/30  transition duration-500 ease-out data-[closed]:opacity-0 backdrop-blur-sm"
    >
      <DialogPanel className="w-full sm:w-3/4 lg:top-0 lg:right-0 lg:max-w-xl h-full max-h-screen bg-white shadow-xl transform lg:translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto">
        <DialogTitle className="text-lg font-medium text-gray-700 px-4 py-4 100 border-b border-gray-200 flex justify-between items-center">
          Add new tenant
          <div className="flex justify-between items-center p-4 ">
            <button onClick={() => setIsOpen(false)} className="text-gray-600">
              <FaTimes />
            </button>
          </div>
        </DialogTitle>
        <form
          className=" flex flex-col space-y-4 p-4  flex-1 overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className=" space-y-6 flex-grow ">
            <PropertySelect formData={formData} setFormData={setFormData} />
            <TenantSelect formData={formData} setFormData={setFormData} />
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
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md text-gray-700"
                placeholder="01"
                name="unit_number"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="timsReport"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload TIMS Report
                </label>
                <div
                  className={`mt-2 border border-dashed rounded-lg p-4 text-center ${
                    isDragging
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => handleDrop(e, "tims_report")}
                >
                  <label htmlFor="timsReport">
                    <div className="border cursor-pointer text-gray-600 w-11 flex justify-center p-2 shadow rounded-md mx-auto my-2">
                      <FiUploadCloud className="text-lg" />
                    </div>
                    <span className="cursor-pointer font-medium text-purple-700 hover:text-purple-800">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </label>
                  <input
                    type="file"
                    id="timsReport"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileRead(e.target.files[0], "tims_report");
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    SVG, PNG, JPG, or GIF (max. 800x400px)
                  </p>
                </div>
              </div>
              {/* Lease Contract Upload */}
              <div>
                <label
                  htmlFor="leaseContract"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Lease Contract
                </label>
                <div
                  className={`mt-2 border border-dashed rounded-lg p-4 text-center ${
                    isDragging
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => handleDrop(e, "lease_contract")}
                >
                  <label htmlFor="leaseContract">
                    <div className="border cursor-pointer text-gray-600 w-11 flex justify-center p-2 shadow rounded-md mx-auto my-2">
                      <FiUploadCloud className="text-lg" />
                    </div>
                    <span className="cursor-pointer font-medium text-purple-700 hover:text-purple-800">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </label>
                  <input
                    type="file"
                    id="leaseContract"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileRead(e.target.files[0], "lease_contract");
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    SVG, PNG, JPG, or GIF (max. 800x400px)
                  </p>
                </div>
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
                type="text"
                id="outstandingPayment"
                name="outstanding_payment"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:shadow-md  text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. 200.00"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center  justify-between gap-2 mt-8">
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

export default AddTenantModal;
