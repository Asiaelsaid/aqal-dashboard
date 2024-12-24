const ButtonGroup = () => {
  return (
    <div>
      <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
          All tenants
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
          Bought Units
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
          Renters
        </button>
      </div>

      <h2 className="text-lg font-medium mt-6">
        Tenants list (White stone Apartments)
      </h2>
    </div>
  );
};

export default ButtonGroup;
