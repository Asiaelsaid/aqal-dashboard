import React from "react";

interface Activity {
  activity: string;
  date_time: string;
  property_name: string;
  property_location: string;
  details: string;
  related_user: string;
}

interface IProps {
  recentActivity: Activity[];
}
const ActivityTable: React.FC<IProps> = ({ recentActivity }) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
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
              <th className="px-6 py-3 border-b text-left">Date & Time</th>
              <th className="px-6 py-3 border-b text-left">Property Name</th>
              <th className="px-6 py-3 border-b text-left">Details</th>
              <th className="px-6 py-3 border-b text-left">User</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {item.activity}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {new Date(item.date_time).toLocaleString()}{" "}
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  <div>
                    <p className="font-medium text-gray-700">
                      {item.property_name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {item.property_location}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap text-left">
                  {truncateText(item.details, 40)}
                </td>
                <td className="text-sm text-gray-500">
                  Request by{" "}
                  <span className="font-medium text-gray-800">
                    {item.related_user}
                  </span>
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
