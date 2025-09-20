import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import useCustomQuery from "@hooks/useCustomQuery";
import useAxios from "@config/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiUpload, FiDownload, FiTrash2, FiPlus, FiEye } from "react-icons/fi";

interface PropertyReport {
  id: number;
  property_name: string;
  month: string;
  year: string;
  report_file: string;
  uploaded_at: string;
  uploaded_by: string;
  uploaded_by_name: string;
}

const Reports = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading] = useState(false);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const storedRole: string = localStorage.getItem("role") as string;
    setRole(storedRole);
  }, []);

  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  // Fetch properties
  const { data: propertyData } = useCustomQuery({
    queryKey: ["properties"],
    url: "/owners/properties",
  });

  // Fetch uploaded reports
  const { data: reportsData, isLoading } = useCustomQuery({
    queryKey: ["property-reports"],
    url: "/managers/property-reports/",
  });

  const properties = propertyData?.data || [];
  const reports: PropertyReport[] = reportsData?.data || [];

  // Upload report mutation
  const { mutate: uploadReport } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post("/managers/property-reports/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Report uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["property-reports"] });
      setShowUploadForm(false);
      setSelectedProperty(null);
      setSelectedMonth("");
      setSelectedFile(null);
    },
    onError: () => {
      toast.error("Failed to upload report");
    },
  });

  // Delete report mutation
  const { mutate: deleteReport } = useMutation({
    mutationFn: async (reportId: number) => {
      const response = await axiosInstance.delete(`/managers/property-reports/${reportId}/`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Report deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["property-reports"] });
    },
    onError: () => {
      toast.error("Failed to delete report");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedProperty || !selectedMonth || !selectedYear || !selectedFile) {
      toast.error("Please fill in all fields and select a file");
      return;
    }

    const formData = new FormData();
    formData.append("property", selectedProperty.toString());
    formData.append("month", selectedMonth);
    formData.append("year", selectedYear);
    formData.append("report_file", selectedFile);

    uploadReport(formData);
  };

  const handleDelete = (reportId: number) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      deleteReport(reportId);
    }
  };

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Property Reports" />
      <SubHeading subHeading="Upload and manage property reports by month" />

             {/* Upload Button - Only for Managers */}
       {role === "managers" && (
         <div className="mt-6 flex justify-end">
           <button
             onClick={() => setShowUploadForm(!showUploadForm)}
             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
           >
             <FiPlus />
             Upload Report
           </button>
         </div>
       )}

             {/* Upload Form - Only for Managers */}
       {showUploadForm && role === "managers" && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Upload New Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property
              </label>
              <select
                value={selectedProperty ?? ""}
                onChange={(e) => setSelectedProperty(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Property</option>
                {properties.map((prop: any) => (
                  <option key={prop.id} value={prop.id}>
                    {prop.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report File
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            >
              <FiUpload />
              {isUploading ? "Uploading..." : "Upload Report"}
            </button>
            <button
              onClick={() => setShowUploadForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reports Table */}
      <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Uploaded Reports</h3>
        </div>
        
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No reports uploaded yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month/Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.property_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {months.find(m => m.value === report.month)?.label} {report.year}
                    </td>
                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       {report.uploaded_by_name}
                     </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.uploaded_at).toLocaleDateString()}
                    </td>
                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                       <div className="flex gap-2">
                         <a
                           href={report.report_file}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-green-600 hover:text-green-900 flex items-center gap-1"
                         >
                           <FiEye />
                           View
                         </a>
                         <a
                           href={report.report_file}
                           download
                           className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                         >
                           <FiDownload />
                           Download
                         </a>
                         {role === "managers" && (
                           <button
                             onClick={() => handleDelete(report.id)}
                             className="text-red-600 hover:text-red-900 flex items-center gap-1"
                           >
                             <FiTrash2 />
                             Delete
                           </button>
                         )}
                       </div>
                     </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
