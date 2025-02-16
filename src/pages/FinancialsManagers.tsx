import ButtonsGroup from "@components/FinancialsManagers/ButtonsGroup";
import ExpensesReports from "@components/FinancialsManagers/Expenses/ExpensesReports";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import { useState } from "react";
// import { FiSearch } from "react-icons/fi";

const FinancialsManagers = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>();

  const renderComponent = () => {
    switch (selectedStatus) {
      // case "Rental income reports":
      //   return <div>Rental Income Reports Content</div>;
      case "Expenses reports":
        return <ExpensesReports />;
      // case "Outstanding payments":
      //   return <div>Outstanding Payments Content</div>;
      // case "Bank reciepts":
      //   return <div>Bank Receipts Content</div>;
      default:
        return <ExpensesReports />;
    }
  };

  // const searchInput = (
  //   <div className="flex items-center w-full max-w-md px-4 py-2 text-gray-500 bg-white border rounded-lg shadow-sm space-x-2 lg:w-1/4">
  //     <FiSearch className="text-gray-400" />
  //     <input
  //       type="text"
  //       placeholder="Search"
  //       // value={searchQuery}
  //       // onChange={(e) => setSearchQuery(e.target.value)}
  //       className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
  //     />
  //   </div>
  // );
  return (
    <div className="flex-1 p-5 bg-gray-50">
      <PagesHeading heading="Financials"  />
      <SubHeading subHeading="Manage all your payments and expenses all in one place" />
      <ButtonsGroup onStatusChange={(status) => setSelectedStatus(status)} />
      <div className="mt-5">{renderComponent()}</div>
    </div>
  );
};

export default FinancialsManagers;
