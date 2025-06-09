import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import useCustomQuery from "@hooks/useCustomQuery";
import useAxios from "@config/axios.config"; // ✅ Import your custom Axios instance
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const Reports = () => {
  const [propertyId, setPropertyId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const axiosInstance = useAxios(); // ✅ Custom Axios

  const { data: propertyData } = useCustomQuery({
    queryKey: ["properties"],
    url: "/owners/properties",
  });

  const properties = propertyData?.data || [];

  const { mutate: generateReport, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        "/managers/reports/",
        {
          property_id: propertyId,
          start_date: startDate,
          end_date: endDate,
        },
        {
          responseType: "blob",
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      const blob = new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      toast.success("Report generated!");
    },
    onError: () => {
      toast.error("Failed to generate report");
    },
  });

  const handleSubmit = () => {
    if (!propertyId || !startDate || !endDate) {
      toast.error("Please fill in all fields.");
      return;
    }
    generateReport();
  };

  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Reports" />
      <SubHeading subHeading="Generate detailed financial & maintenance reports for properties" />

      <div className="mt-8 border shadow rounded-lg p-6 bg-white space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Property
            </label>
            <select
              value={propertyId ?? ""}
              onChange={(e) => setPropertyId(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            >
              <option value="">-- Choose Property --</option>
              {properties.map((prop: any) => (
                <option key={prop.id} value={prop.id}>
                  {prop.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 mt-6">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Generating..." : "Generate Report"}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="property_report.pdf"
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Download Report
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
