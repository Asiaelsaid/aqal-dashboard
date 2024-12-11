// import PropertiesHeader from "@components/Properties/PropertiesHeader";
// import useCustomQuery from "@hooks/useCustomQuery";
// import { useParams } from "react-router-dom";
// import { FaSwimmingPool, FaLeaf, FaDumbbell } from "react-icons/fa";
// import imageOne from "@assets/images/Image.png";
// import { FiUploadCloud } from "react-icons/fi";

// const PropertyDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data, isLoading, isError } = useCustomQuery({
//     queryKey: ["propertyDetails"],
//     url: `/owners/property/${id}`,
//   });

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (isError) {
//     return <p>Something went wrong. Please try again.</p>;
//   }

//   const property = data?.data;

//   return (
//     <div className="flex flex-col p-6  min-h-screen">
//       <PropertiesHeader />

//       <div className=" grid lg:grid-cols-10 gap-4 bg-white p-4 rounded-lg shadow-md">
//         <div className="lg:col-span-3">
//           <img
//             src={property?.images[0] || imageOne}
//             alt={property?.name}
//             className="w-full h-80  rounded-lg shadow-md mb-3"
//           />
//           <div className="relative w-full h-44 rounded-lg shadow-md">
//             <img
//               src={property?.images[0] || imageOne}
//               alt={property?.name}
//               className="w-full h-full object-cover rounded-lg shadow-md opacity-40"
//             />
//             <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-3xl font-bold">
//               +6
//             </span>
//           </div>
//           <button className="mt-4 w-full py-2 px-4 flex items-center justify-center bg-white hover:bg-purple-600 text-mainColor hover:text-white font-semibold rounded-lg shadow border-2 border-mainColor">
//             <FiUploadCloud className="mr-2" />
//             Upload new image
//           </button>
//         </div>

//         <div className="lg:col-span-7 ">
//           <p className="text-xl font-bold text-gray-800 mb-4">
//             {property?.name || "Property Name"}
//           </p>
//           <p className="text-gray-500 mb-6">
//             {property?.description || "Property description not available."}
//           </p>

//           <div className="grid grid-cols-3 gap-11">
//             <div>
//               <p className="text-sm  text-gray-400">Property Address</p>
//               <p className="text-gray-700   font-semibold">
//                 {property?.location || "N/A"}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-400">Year of Build</p>
//               <p className="text-gray-700   font-semibold">2019</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-400">Property manager</p>
//               <p className="text-gray-700   font-semibold">
//                 {property?.property_manager?.first_name}{" "}
//                 {property?.property_manager?.last_name}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm  text-gray-400">Property Type</h3>
//               <p className="text-gray-700   font-semibold">
//                 {property?.property_type?.name || "N/A"}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm text-gray-400">Property Levels</h3>
//               <p className="text-gray-700   font-semibold">
//                 {property?.property_level || "N/A"}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm text-gray-400">Unit Count</h3>
//               <p className="text-gray-700   font-semibold">6</p>
//             </div>
//             <div>
//               <h3 className="text-sm text-gray-400">Total Units</h3>
//               <p className="text-gray-700   font-semibold">
//                 {property?.total_units || "N/A"}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500">
//                 Vacant Units
//               </h3>
//               <p className="text-gray-800">{property?.vacant_units || "N/A"}</p>
//             </div>
//             <div>
//               <h3 className="text-sm  text-gray-400">Unit Types</h3>
//               <p className="text-gray-700  font-semibold">
//                 {property?.unit_types || "N/A"}
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-11 mt-8">
//           <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Property common areas
//               </h3>
//               <div className="flex flex-col  gap-4">
//                 {property?.common_areas?.map((area:{id:number,name:string}) => (
//                   <p
//                     key={area.id}
//                     className="flex items-center gap-2 text-gray-700"
//                   >
//                     {area.name === "Gym" && <FaDumbbell />}
//                     <span>{area.name}</span>
//                   </p>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 Property Amenities
//               </h3>
//               <ul className="flex flex-wrap gap-4">
//                 {property?.amenities?.map((amenity:{id:number,name:string}) => (
//                   <li
//                     key={amenity.id}
//                     className="flex items-center gap-2 text-gray-700"
//                   >
//                     {amenity.name === "Swimming Pool" && <FaSwimmingPool />}
//                     {amenity.name === "Garden" && <FaLeaf />}
//                     <span>{amenity.name}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

           
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;
import PropertiesHeader from "@components/Properties/PropertiesHeader";
import useCustomQuery from "@hooks/useCustomQuery";
import { useParams } from "react-router-dom";
import { FaSwimmingPool, FaLeaf, FaDumbbell } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import imageOne from "@assets/images/Image.png";

const Loading = () => <p>Loading...</p>;
const Error = () => <p>Something went wrong. Please try again.</p>;

const ImagePreview = ({ images, name }:{images:string[],name:string}) => (
  <div className="lg:col-span-3">
    <img
      src={images?.[0] || imageOne}
      alt={name}
      className="w-full h-80 rounded-lg shadow-md mb-3"
    />
    <div className="relative w-full h-44 rounded-lg shadow-md">
      <img
        src={images?.[0] || imageOne}
        alt={name}
        className="w-full h-full object-cover rounded-lg shadow-md opacity-40"
      />
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-3xl font-bold">
        +6
      </span>
    </div>
    <button className="mt-4 w-full py-2 px-4 flex items-center justify-center bg-white hover:bg-purple-600 text-mainColor hover:text-white font-semibold rounded-lg shadow border-2 border-mainColor">
      <FiUploadCloud className="mr-2" />
      Upload new image
    </button>
  </div>
);

const PropertyDetailsCard = ({ label, value }:{label:string,value:string}) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-gray-700 font-semibold">{value || "N/A"}</p>
  </div>
);

const IconText = ({ icon, text }) => (
  <p className="flex items-center gap-2 text-gray-700">
    {icon}
    <span>{text}</span>
  </p>
);

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useCustomQuery({
    queryKey: ["propertyDetails"],
    url: `/owners/property/${id}`,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const property = data?.data;

  return (
    <div className="flex flex-col p-6 min-h-screen">
      <PropertiesHeader />

      <div className="grid lg:grid-cols-10 gap-4 bg-white p-4 rounded-lg shadow-md">
        <ImagePreview images={property?.images} name={property?.name} />

        <div className="lg:col-span-7">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            {property?.name || "Property Name"}
          </h1>
          <p className="text-gray-500 mb-6">
            {property?.description || "Property description not available."}
          </p>

          <div className="grid grid-cols-3 gap-11">
            <PropertyDetailsCard label="Property Address" value={property?.location} />
            <PropertyDetailsCard label="Year of Build" value="2019" />
            <PropertyDetailsCard
              label="Property Manager"
              value={`${
          property?.property_manager?.first_name || "N/A"
        } ${property?.property_manager?.last_name || ""}`}
            />
            <PropertyDetailsCard label="Property Type" value={property?.property_type?.name} />
            <PropertyDetailsCard label="Property Levels" value={property?.property_level} />
            <PropertyDetailsCard label="Unit Count" value="6" />
            <PropertyDetailsCard label="Total Units" value={property?.total_units} />
            <PropertyDetailsCard label="Vacant Units" value={property?.vacant_units} />
            <PropertyDetailsCard label="Unit Types" value={property?.unit_types} />
          </div>

          <div className="grid grid-cols-2 gap-11 mt-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Property Common Areas
              </h3>
              <div className="flex flex-col gap-4">
                {property?.common_areas?.map((area) => (
                  <IconText
                    key={area.id}
                    icon={area.name === "Gym" && <FaDumbbell />}
                    text={area.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Property Amenities
              </h3>
              <ul className="flex flex-wrap gap-4">
                {property?.amenities?.map((amenity) => (
                  <IconText
                    key={amenity.id}
                    icon={
                      (amenity.name === "Swimming Pool" && <FaSwimmingPool />) ||
                      (amenity.name === "Garden" && <FaLeaf />)
                    }
                    text={amenity.name}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
