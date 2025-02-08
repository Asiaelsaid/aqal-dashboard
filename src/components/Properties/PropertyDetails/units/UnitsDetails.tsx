import useCustomQuery from "@hooks/useCustomQuery";
import { useParams } from "react-router-dom";
import UnitsTable from "./UnitsTable";

interface IProps {
 
  properyName:string;
}

const UnitsDetails: React.FC<IProps> = ({ properyName}) => {
  const { id } = useParams<{ id: string }>();
  const { data ,refetch} = useCustomQuery({
    queryKey: ["propertyUnits"],
    url: `/owners/properties/${id}/units`,
  });
  const units=data?.data
  
  return (
    <div className="mt-8 p-6 w-full rounded-lg border bg-white ">
       <UnitsTable units={units} properyName={properyName} onRefetch={refetch}/>
    </div>
  );
};

export default UnitsDetails;
