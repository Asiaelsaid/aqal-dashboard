import { IContactTableProps } from "@interfaces";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddContact from "./AddContact";
interface IProps {
  ContactData: IContactTableProps[];
}
const ContactsTable: React.FC<IProps> = ({ ContactData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
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
              </tr>
            </thead>
            <tbody>
              {ContactData?.length > 0 &&
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <AddContact isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default ContactsTable;
