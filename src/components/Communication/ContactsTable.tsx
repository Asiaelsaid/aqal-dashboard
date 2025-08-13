import { IContactTableProps } from "@interfaces";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import AddContact from "./AddContact";
import EditContact from "@components/Communication/EditContact";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@config/axios.config";
interface IProps {
  ContactData: IContactTableProps[];
  refetch: () => void;
}
const ContactsTable: React.FC<IProps> = ({ ContactData, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContactTableProps | null>(null);
  const axiosInstance = useAxios();
  
  const openModal = () => setIsOpen(true);
  
  const { mutate: deleteContact } = useMutation({
    mutationFn: async (contactId: number) => {
      const response = await axiosInstance.delete(`/users/contacts/${contactId}/`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Contact deleted successfully!");
      refetch();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete contact");
    },
  });

  const handleEdit = (contact: IContactTableProps) => {
    setSelectedContact(contact);
    setIsEditOpen(true);
  };

  const handleDelete = (contactId: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(contactId);
    }
  };
  return (
    <div className="border rounded-lg shadow-md mt-4">
        <div className=" p-4  flex md:justify-between items-center sm:justify-end w-full sm:w-auto">
          <h2 className="text-lg font-semibold">Contacts list</h2>
          <button
            onClick={openModal}
            className="px-6 py-3 flex items-center text-sm font-medium text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700"
          >
            <FaPlus className="mr-2" /> Add new contact
          </button>
        </div>
        <div className="overflow-x-auto mt-4 ">
          <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
            <thead className="text-xs text-gray-500 bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b text-left ">Contact name</th>
                <th className="px-6 py-3 border-b text-left">Type</th>
                <th className="px-6 py-3 border-b text-left">Email</th>
                <th className="px-6 py-3 border-b text-left">Phone number</th>
                <th className="px-6 py-3 border-b text-left">Address</th>
                <th className="px-6 py-3 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ContactData?.length > 0 ? (
                ContactData.map((contact) => (
                  <tr key={contact.id}>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                      {contact.type}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                      {contact.phone_number}
                    </td>
                    <td className="px-6 py-4 border-b text-left">
                      {contact.address}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit Contact"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete Contact"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <AddContact isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />
        <EditContact 
          isOpen={isEditOpen} 
          setIsOpen={setIsEditOpen} 
          contact={selectedContact}
          refetch={refetch}
        />
    </div>
  );
};

export default ContactsTable;
