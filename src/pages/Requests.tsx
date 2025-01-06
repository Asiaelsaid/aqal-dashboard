import DateRangePicker from "@components/Properties/Filters/DateRangePicker";
import RequestsTable from "@components/Requests/RequestsTable";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import { FiSearch } from "react-icons/fi";


interface TableHeader {
    key: string;
    label: string;
    align?: "left" | "center" | "right";
  }
  
  interface TableRow {
    [key: string]: string | JSX.Element;
  }
  const headers: TableHeader[] = [
    { key: "date", label: "Date", align: "left" },
    { key: "requestId", label: "Request ID", align: "left" },
    { key: "serviceType", label: "Service type", align: "left" },
    { key: "description", label: "Description", align: "left" },
    { key: "status", label: "Status", align: "center" },
  ];

const rows: TableRow[] = [
  {
    date: "22 Jan 2022",
    requestId: "REQ-20241028-001",
    serviceType: "Plumber",
    description:
      "Leaking faucet in the kitchen. Water is dripping continuously.",
    status: (
      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-200 rounded">
        Solved
      </span>
    ),
  },
  {
    date: "19 Jan 2022",
    requestId: "REQ-20241028-002",
    serviceType: "Electrician",
    description: "Couldn't switch on bedroom lights",
    status: (
      <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-200 rounded">
        In progress
      </span>
    ),
  },
  {
    date: "22 Oct 2022",
    requestId: "REQ-20241028-003",
    serviceType: "Plumber",
    description:
      "Leaking faucet in the kitchen. Water is dripping continuously.",
    status: (
      <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-200 rounded">
        In progress
      </span>
    ),
  },
  {
    date: "23 Jan 2022",
    requestId: "REQ-20241028-004",
    serviceType: "Electrician",
    description: "Couldn't switch on bedroom lights",
    status: (
      <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-200 rounded">
        In progress
      </span>
    ),
  },
  {
    date: "02 May 2022",
    requestId: "REQ-20241028-005",
    serviceType: "Other",
    description: "Couldn't switch on bedroom lights",
    status: (
      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-200 rounded">
        Solved
      </span>
    ),
  },
];

const Requests = () => {
  const searchInput = (
    <div className="flex items-center w-full max-w-md px-4 py-2 text-gray-500 bg-white border rounded-lg shadow-sm space-x-2 lg:w-1/4">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        // value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
      />
    </div>
  );
  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Requests" child={searchInput} />
      <SubHeading subHeading="Track Maintenancetickets from tenants swith ease" />
      <DateRangePicker />
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center pb-4">
          <div>
            <h2 className="text-xl font-semibold">All requests</h2>
            <p className="text-sm text-gray-500">See what requests you have made throughout</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300">All</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Received</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300">In progress</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Solved</button>
          </div>
        </div>
        <RequestsTable headers={headers} rows={rows} />
      </div>
    </div>
  );
};

export default Requests;
