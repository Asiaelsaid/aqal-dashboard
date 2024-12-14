interface IProps {
    label:string;
    value:string;
}

const PropertyDetailsCard: React.FC<IProps> = ({label,value}) => {
    return <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-gray-700 font-semibold">{value || "N/A"}</p>
  </div>
};

export default PropertyDetailsCard;