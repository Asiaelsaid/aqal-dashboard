interface IProps {}

const ButtonGroup: React.FC<IProps> = () => {
    return  <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
      All
    </button>
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
      Recieved
    </button>
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
      In progress
    </button>
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-purple-500 focus:text-purple-500">
      Solved
    </button>
  </div>
};

export default ButtonGroup;