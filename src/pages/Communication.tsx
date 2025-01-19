import ContactsTable from "@components/Communication/ContactsTable";
import Pagination from "@components/Properties/Pagination";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import useCustomQuery from "@hooks/useCustomQuery";
import { IContactTableProps } from "@interfaces";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Communication = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const contactPerPage = 10;

  // Fetch data
  const { data } = useCustomQuery({
    queryKey: ["contacts"],
    url: "/users/contacts/",
  });
  const contacts: IContactTableProps[] = data?.data;

  // Filter logic

  const filteredContacts = contacts?.filter((contact) =>
    Object.values(contact).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const totalContacts = filteredContacts?.length || 0;
  const totalPages = Math.ceil(totalContacts / contactPerPage);
  const currentContacts = filteredContacts?.slice(
    (currentPage - 1) * contactPerPage,
    currentPage * contactPerPage
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const searchInput = (
    <div className="flex items-center w-full max-w-md px-4 py-2 text-gray-500 bg-white border rounded-lg shadow-sm space-x-2 lg:w-1/4">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search "
        value={searchQuery}
        onChange={handleSearch}
        className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
      />
    </div>
  );
  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Communication" child={searchInput} />
      <SubHeading subHeading="Connect with tenants, service providers, and emergency contacts seamlessly." />
      <hr />
      <ContactsTable ContactData={currentContacts} />
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Communication;
