import ContactsTable from "@components/Communication/ContactsTable";
import Pagination from "@components/Properties/Pagination";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import useCustomQuery from "@hooks/useCustomQuery";
import { IContactTableProps } from "@interfaces";
import { useState } from "react";

const Communication = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const contactPerPage = 10;
  const { data } = useCustomQuery({
    queryKey: ["contacts"],
    url: "/users/contacts/",
  });
  const contacts: IContactTableProps[] = data?.data;
  // Pagination Logic
  const totalContacts = contacts?.length;
  const totalPages = Math.ceil(totalContacts / contactPerPage);
  const currentContacts = contacts?.slice(
    (currentPage - 1) * contactPerPage,
    currentPage * contactPerPage
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Communication" />
      <SubHeading subHeading="Connect with tenants, service providers, and emergency contacts seamlessly." />
      <hr />
      <ContactsTable ContactData={currentContacts} />
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Communication;
