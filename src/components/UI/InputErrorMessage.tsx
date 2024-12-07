interface IProps {
  msg?: string;
}

const InputErrorMessage: React.FC<IProps> = ({ msg }) => {
  return msg ? (
    <span className="block text-red-700 font-semibold text-sm">{msg}</span>
  ) : (
    ""
  );
};

export default InputErrorMessage;
