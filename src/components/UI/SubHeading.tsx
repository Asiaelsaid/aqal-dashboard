interface IProps {
    subHeading: string
}

const SubHeading: React.FC<IProps> = ({subHeading}) => {
    return <>
     <p className="text-base text-gray-500">
       {subHeading}
      </p>
      <hr /></>
};

export default SubHeading;