import useCustomQuery from "@hooks/useCustomQuery";
import { useParams } from "react-router-dom";
import UnitsTable from "./UnitsTable";

interface IProps {
  propertyId:number
}

const UnitsDetails: React.FC<IProps> = ({propertyId}) => {
  console.log(propertyId);
  const { id } = useParams<{ id: string }>();
  const { data } = useCustomQuery({
    queryKey: ["propertyUnits"],
    url: `/owners/properties/${id}/units`,
  });
  const units=data?.data
  
  return (
    <div className="mt-8 p-6 w-full rounded-lg border bg-white ">
       <UnitsTable units={units} />
    </div>
  );
};

export default UnitsDetails;
