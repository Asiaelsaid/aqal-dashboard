interface IProps {
  subHeading: string;
}

const SubHeading: React.FC<IProps> = ({ subHeading }) => {
  return (
    <div className="space-y-6">
      <p className="text-base text-gray-500">{subHeading}</p>
      <hr />
    </div>
  );
};

export default SubHeading;
