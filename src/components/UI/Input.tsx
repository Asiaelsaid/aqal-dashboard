import { forwardRef, InputHTMLAttributes, Ref } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<IProps> = forwardRef(({ ...rest },ref:Ref<HTMLInputElement>) => {
  return (
    <input
    ref={ref}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
      {...rest}
    />
  );
});

export default Input;
