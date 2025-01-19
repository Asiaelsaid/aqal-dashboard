import useAxios from "@config/axios.config";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IErrorrEsponse } from "@interfaces";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { AxiosError } from "axios";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddContact: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const axiosInstance = useAxios();
  const [contactData, setContactData] = useState({
    name: "",
    type: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await axiosInstance.post(
        "/users/contacts/",
        contactData
      );
      if (data.satus === 201) {
        toast.success("Contact added successfully!");
        setContactData({
          name: "",
          type: "",
          email: "",
          phone_number: "",
          address: "",
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="fixed  top-0 right-0 flex w-screen h-screen items-center justify-center bg-black/30  transition duration-500 ease-out data-[closed]:opacity-0 backdrop-blur-sm"
    >
      <DialogPanel className="w-full sm:w-3/4 lg:top-0 lg:right-0 lg:max-w-lg h-full max-h-screen bg-white shadow-xl transform lg:translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto">
        <DialogTitle className="text-lg font-medium text-gray-700 p-4 border-b border-gray-200 flex justify-between items-center">
          Add new contact
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
              Contact Name
            </label>
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Type</label>
            <input
              type="text"
              name="type"
              value={contactData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Service provider"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="example@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={contactData.phone_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="+123456789"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              name="address"
              value={contactData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
              placeholder="123 Main St, Nairobi"
            />
          </div>

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

export default AddContact;
