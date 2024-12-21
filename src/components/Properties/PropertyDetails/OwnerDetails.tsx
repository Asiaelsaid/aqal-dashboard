import React from "react";

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  emergency_number: string;
}

interface IProps {
  userData: IUser;
}
const thStyle = "py-3 px-4 text-left text-gray-500 font-medium";

const OwnerDetails: React.FC<IProps> = ({ userData }) => {
  const { first_name, last_name, email, phone_number, emergency_number } = userData;

  return (
    <div className="overflow-x-auto">
    <div className="mt-8 p-6 w-full rounded-lg border bg-white ">
      {/* Card Container */}
      <div className="bg-white rounded-lg border w-full">
        {/* Header Section */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">White Stone Apartments</h2>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className={thStyle}>
                  <input type="checkbox" className="w-4 h-4 text-blue-500" />
                </th>
                <th className={thStyle}>Name</th>
                {/* <th className={thStyle}>Email</th> */}
                <th className={thStyle}>Phone Number</th>
                <th className={thStyle}>Emergency Contact</th>
                {/* <th className={thStyle}>Actions</th> */}
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-gray-50">
                {/* Checkbox */}
                <td className="py-4 px-4">
                  <input type="checkbox" className="w-4 h-4 text-blue-500" />
                </td>

                {/* Name and Avatar */}
                <td className="py-4 px-4 flex items-center space-x-4 ">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Avatar"
                    className="w-14 h-14 rounded-full"
                  />
                  <p className="font-medium text-gray-700">
                    {first_name} {last_name}
                    <p> {email}</p>
                  </p>
                </td>
                {/* <td className="py-4 px-4 text-gray-700">{email}</td> */}
                <td className="py-4 px-4 text-gray-700">{phone_number}</td>
                <td className="py-4 px-4 text-gray-700">{emergency_number}</td>
                {/* <td className="py-4 px-4 flex items-center justify-center space-x-3">
                  <button
                    className="text-gray-400 hover:text-gray-700"
                    aria-label="Delete"
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-700"
                    aria-label="Edit"
                  >
                    <FaPen />
                  </button>
                </td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OwnerDetails;
