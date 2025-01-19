// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { FiUploadCloud } from "react-icons/fi";

// interface FileUploadProps {
//   onUpload: (file: File | null) => void;
//   // progress: number;
//   // uploadedFileName?: string;
// }

// const FileUpload:React.FC<FileUploadProps> = () => {
//   const [isDragging, setIsDragging] = useState(false);
//   const handleFileRead = (
//     file: File,
//     field: "tims_report" | "lease_contract"
//   ) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.result) {
//         // setFormData((prev) => ({
//         //   ...prev,
//         //   [field]: file,
//         // }));
//         toast.success(
//           `${
//             field === "tims_report" ? "TIMS Report" : "Lease Contract"
//           } uploaded successfully!`
//         );
//       }
//     };
//     reader.onerror = () => {
//       toast.error(
//         `Failed to upload ${
//           field === "tims_report" ? "TIMS Report" : "Lease Contract"
//         }.`
//       );
//     };
//     reader.readAsDataURL(file);
//   };
//   const handleDrop = (
//     e: React.DragEvent<HTMLDivElement>,
//     field: "tims_report" | "lease_contract"
//   ) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileRead(e.dataTransfer.files[0], field);
//     }
//   };
//   return (
//     <div className="flex flex-col mb-6">
//       <div
//         className={`mt-2 border-2 rounded-lg p-4 text-center hover:border-purple-500 ${
//           isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
//         }`}
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={(e) => {
//           e.preventDefault();
//           setIsDragging(false);
//         }}
//         onDrop={(e) => handleDrop(e, "lease_contract")}
//       >
//         <label htmlFor="leaseContract">
//           <div className="border cursor-pointer text-gray-600 w-11 flex justify-center p-2 shadow rounded-md mx-auto my-2">
//             <FiUploadCloud className="text-lg" />
//           </div>
//           <span className="cursor-pointer font-medium text-purple-700 hover:text-purple-800">
//             Click to upload
//           </span>{" "}
//           or drag and drop
//         </label>
//         <input
//           type="file"
//           id="leaseContract"
//           className="hidden"
//           onChange={(e) => {
//             if (e.target.files && e.target.files[0]) {
//               handleFileRead(e.target.files[0], "lease_contract");
//             }
//           }}
//         />
//         <p className="text-sm text-gray-500 mt-1">
//           SVG, PNG, JPG, or GIF (max. 800x400px)
//         </p>
//       </div>
//     </div>
//   );
// };
// export default FileUpload;
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";

interface FileUploadProps {
  onUpload: (file: File | null, field: "doc") => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileRead = (file: File, field: "doc") => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        onUpload(file, field); 
        toast.success(
          `user document  uploaded successfully!`
        );
      }
    };
    reader.onerror = () => {
      toast.error(
        `Failed to upload user document}`
      );
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    field: "doc"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileRead(e.dataTransfer.files[0], field);
    }
  };

  return (
    <div className="flex flex-col mb-6">
      <div
        className={`mt-2 border-2 rounded-lg p-4 text-center transition-colors duration-200 hover:border-purple-500 ${
          isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(e) => handleDrop(e, "doc")}
      >
        <label htmlFor="leaseContract">
          <div className="border cursor-pointer text-gray-600 w-11 flex justify-center p-2 shadow rounded-md mx-auto my-2">
            <FiUploadCloud className="text-lg" />
          </div>
          <span className="cursor-pointer font-medium text-purple-700 hover:text-purple-800">
            Click to upload
          </span>{" "}
          or drag and drop
        </label>
        <input
          type="file"
          id="leaseContract"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileRead(e.target.files[0], "doc");
            }
          }}
        />
        <p className="text-sm text-gray-500 mt-1">
          SVG, PNG, JPG, or GIF (max. 800x400px)
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
