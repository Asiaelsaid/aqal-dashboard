import React from "react";

interface Activity {
  activity: string;
  date: string;
  propertyName: string;
  address: string;
  details: string;
  category: {
    label: string;
    color: string;
  };
}

const data: Activity[] = [
  {
    activity: "Rent Payment Received",
    date: "22 Jan 2022",
    propertyName: "Green Acres Apt 12",
    address: "456 Oak Ave, Townsville",
    details: "Rent from Tenant A: $1,200",
    category: { label: "Completed", color: "green" },
  },
  {
    activity: "Lease Expiration Reminder",
    date: "22 Jan 2022",
    propertyName: "Blue Creek Apt 8",
    address: "101 River Rd, Lakeside",
    details: "Lease expiring in 30 days",
    category: { label: "Pending", color: "yellow" },
  },
  {
    activity: "Maintenance Request Raised",
    date: "22 Jan 2022",
    propertyName: "Maple Street Apt 4",
    address: "202 Sunshine Blvd, Seaside",
    details: "Plumbing issue in bathroom",
    category: { label: "In progress", color: "blue" },
  },
  {
    activity: "Partial Payment Received",
    date: "22 Jan 2022",
    propertyName: "Riverside Apt 3",
    address: "456 Oak Ave, Townsville",
    details: "Partial rent from Tenant B",
    category: { label: "In progress", color: "blue" },
  },
  {
    activity: "Lease Signed",
    date: "22 Jan 2022",
    propertyName: "Sunnydale House",
    address: "456 Oak Ave, Townsville",
    details: "New lease signed with Tenant C",
    category: { label: "Completed", color: "green" },
  },
];

const ActivityTable: React.FC = () => {
  return (
    <div className=" border shadow-md rounded-lg mt-5">
      <div className="p-4 mt-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <p className="text-gray-500 mb-4 text-sm">
          Keep track of what recently happened.
        </p>
      </div>
      <div className="overflow-x-auto  ">
        <table className="w-full  text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-500 bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left">Activity</th>
              <th className="px-6 py-3 border-b text-left">Date and Time</th>
              <th className="px-6 py-3 border-b text-left">Property Name</th>
              <th className="px-6 py-3 border-b text-left">Details</th>
              <th className="px-6 py-3 border-b text-left">Category</th>
              <th className="px-6 py-3 border-b text-left"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {item.activity}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {item.date}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  <div>
                    <p className="font-medium text-gray-700">{item.propertyName}</p>
                    <p className="text-gray-500 text-xs">{item.address}</p>
                  </div>
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {item.details}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full bg-${item.category.color}-100 text-${item.category.color}-800`}
                  >
                    {item.category.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-gray-500 hover:text-gray-700">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
