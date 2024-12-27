import TenantsSubHeader from "@components/Tenants/TenantsSubHeader";
import TenantsTable from "@components/Tenants/TenantsTable";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import useCustomQuery from "@hooks/useCustomQuery";
import { useMemo, useState } from "react";
import { FiDownloadCloud, FiSearch } from "react-icons/fi";


interface IProperty {
  id: number;
  name: string;
  location: string;
  total_units_count: number;
  occupied_units_count: number;
  vacant_units_count: number;
  
}
const Tenants = () => {
  
    const [searchQuery, setSearchQuery] = useState("");
  const { data } = useCustomQuery({
    queryKey: ["properties"],
    url: "/owners/properties",
  });
const propertiesData=data?.data
const handleDownload = () => {
  const csvRows = [
    ['Property Names', 'Location', 'Total Units', 'Occupied Units', 'Vacant Units'],
    ...propertiesData.map((property:IProperty) => [
      property.name,
      property.location,
      property.total_units_count,
      property.occupied_units_count,
      property.vacant_units_count,
    ]),
  ];
  const csvContent = csvRows.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'property-list.csv';
  a.click();

  window.URL.revokeObjectURL(url);
}
 const filteredProperties = useMemo(() => {
    if (!searchQuery) {
      return propertiesData || []; 
    }
    return propertiesData.filter((property: IProperty) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        property?.name.toLowerCase().includes(lowerCaseQuery) || 
        property?.location.toLowerCase().includes(lowerCaseQuery) ||
        String(property?.total_units_count).includes(lowerCaseQuery) || 
        String(property?.occupied_units_count).includes(lowerCaseQuery) ||
        String(property?.vacant_units_count).includes(lowerCaseQuery) 
        
        
      );
    }) || [];
  }, [data, searchQuery]);
  const searchInput = (
    <div className="flex items-center w-full max-w-md px-4 py-2 text-gray-500 bg-white border rounded-lg shadow-sm space-x-2 lg:w-1/4">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
      />
    </div>
  );
  return (
    <div className="flex-1 p-5 bg-gray-50">
      <PagesHeading heading="Tenants" child={searchInput} />
      <SubHeading subHeading="Manage your all your tenants in one place" />
      <TenantsSubHeader/>
      <div className="mt-5 flex items-center
       justify-between">
        <p className="font-semibold text-lg">Property list</p>
        <button
          onClick={handleDownload}
          className="bg-white flex items-center text-gray-700 px-4 py-2  border rounded-lg  hover:bg-purple-600 hover:text-white"
        >
          <FiDownloadCloud className="mr-1 text-lg"/>
          Download all
        </button>
      </div>
      <TenantsTable data={filteredProperties?filteredProperties :propertiesData}/>
     
    </div>
  );
};

export default Tenants;
