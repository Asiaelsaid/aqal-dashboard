interface IProps {}

const PropertiesFilter: React.FC<IProps> = () => {
  return (
    <div className="px-6 pb-4 space-y-6">
      <p className="text-base text-gray-500">
        Manage all your properties in one place
      </p>
      <hr />
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* First Half: Dropdowns */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 lg:w-1/2">
          {/* Dropdown 1 */}
          <select className="w-full px-4 py-2 text-sm text-gray-500 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Location</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Kisumu">Kisumu</option>
          </select>
          {/* Dropdown 2 */}
          <select className="w-full px-4 py-2 text-sm text-gray-500 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Date Range</option>
            <option value="Jan 6-13">Jan 6 - Jan 13</option>
            <option value="Jan 13-20">Jan 13 - Jan 20</option>
          </select>
          {/* Dropdown 3 */}
          <select className="w-full px-4 py-2 text-sm text-gray-500 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Price Range</option>
            <option value="$0-$100">$0 - $100</option>
            <option value="$100-$500">$100 - $500</option>
          </select>
        </div>

        {/* Second Half: Button */}
        <div className="lg:w-1/4 flex justify-end">
          <button className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            + Add new property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesFilter;
