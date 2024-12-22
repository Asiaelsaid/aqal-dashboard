
import useCustomQuery from "@hooks/useCustomQuery";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import PropertyDetails from "@components/Properties/PropertyDetails/PropertyDetails";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import OwnerDetails from "@components/Properties/PropertyDetails/OwnerDetails";
import UnitsDetails from "@components/Properties/PropertyDetails/units/UnitsDetails";
import PagesHeading from "@components/UI/PagesHeading";

// const Loading = () => toast.loading("Fetching property fields...");
// const Error = () =>  toast.error("Failed to load property fields. Please refresh the page.");
const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError,refetch } = useCustomQuery({
    queryKey: ["propertyDetails"],
    url: `/owners/property/${id}`,
  });
  const property = data?.data;
  const navigate = useNavigate();
  const tabs = [
    { label: "Property details", content:<PropertyDetails property={property} onRefresh={refetch}/> },
    { label: "Owner details", content: <OwnerDetails userData={property?.user}/> },
    { label: "Units", content:<UnitsDetails propertyId={property?.id}/>  },
  ];
  const goBack = () => {
    navigate(-1);
  };
   
  
  if (isLoading) return null ;
  if (isError) return null;

  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading  heading="Properties" />
      <button onClick={goBack} className="flex items-center self-start my-8 text-gray-500 font-semibold">
        <FaArrowLeftLong className="mr-3" />
        Back
      </button>
   
       <TabGroup>
        <TabList className="flex w-2/5 ">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                ` p-4 text-center font-semibold focus:outline-none ${
                  selected
                    ? "  text-mainColor border-b-2 border-mainColor"
                    : "text-gray-500 hover:text-mainColor hover:border-b-2 border-mainColor"
                    
                }`
              }
              
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <hr />
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel
              key={index}
            >
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default PropertyDetailsPage;
