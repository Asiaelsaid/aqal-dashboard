import { GiThreeLeaves } from "react-icons/gi";

interface IProps {
    text:string
}

const IconText: React.FC<IProps> = ({text}) => {
    return  <p className="flex items-center gap-2 text-gray-700">
   <GiThreeLeaves/> 
    <span>{text}</span>
  </p>;
};

export default IconText;