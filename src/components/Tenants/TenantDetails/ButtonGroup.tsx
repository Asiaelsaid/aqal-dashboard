interface ButtonGroupProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ activeFilter = 'all', onFilterChange }) => {
  const handleFilterClick = (filter: string) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <div>
      <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
        <button 
          className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-l-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 ${
            activeFilter === 'all' 
              ? 'text-purple-500 bg-purple-50 border-purple-300' 
              : 'text-gray-700 bg-white'
          }`}
          onClick={() => handleFilterClick('all')}
        >
          All tenants
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 ${
            activeFilter === 'residential' 
              ? 'text-blue-500 bg-blue-50 border-blue-300' 
              : 'text-gray-700 bg-white'
          }`}
          onClick={() => handleFilterClick('residential')}
        >
          Residential
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 ${
            activeFilter === 'commercial' 
              ? 'text-green-500 bg-green-50 border-green-300' 
              : 'text-gray-700 bg-white'
          }`}
          onClick={() => handleFilterClick('commercial')}
        >
          Commercial
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 ${
            activeFilter === 'bought' 
              ? 'text-purple-500 bg-purple-50 border-purple-300' 
              : 'text-gray-700 bg-white'
          }`}
          onClick={() => handleFilterClick('bought')}
        >
          Bought Units
        </button>
      </div>

      <h2 className="text-lg font-medium mt-6">
        Tenants list 
        {activeFilter !== 'all' && (
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({activeFilter === 'residential' ? 'Residential units' : 
              activeFilter === 'commercial' ? 'Commercial units' : 
              activeFilter === 'bought' ? 'Bought units' : ''})
          </span>
        )}
      </h2>
    </div>
  );
};

export default ButtonGroup;
