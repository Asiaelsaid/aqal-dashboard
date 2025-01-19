  const DocumentStatus: React.FC<{ fileName: string; fileSize: string }> = ({ fileName, fileSize }) => {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-100 text-red-500 flex items-center justify-center rounded">
            <svg
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
                d="M19.5 10.5l-7-7m0 0L5.5 10.5m7-7v17"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{fileName}</p>
            <p className="text-xs text-gray-500">{fileSize}</p>
          </div>
        </div>
        <div className="flex-1 bg-gray-200 h-2 rounded-full">
          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  };
  

  export default DocumentStatus