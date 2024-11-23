import Logo from "@assets/images/Logo.png";
import Input from "@components/UI/Input";
import InputErrorMessage from "@components/UI/InputErrorMessage";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  email: string;
}

const PasswordRecovery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  console.log(errors);
  return (
    <div className="lg:w-1/2 w-full bg-white flex flex-col px-8 sm:px-12 py-10">
      <div className="mb-6 ">
        <img src={Logo} alt="Logo" className="h-10 " />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
        Password Recovery
      </h2>
      <p className="text-gray-600 mb-6 text-center lg:text-left">
        Password Recovery
      </p>

      <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col flex-grow">
        <div className="mb-4 flex-grow" >
          <label className="block text-sm font-medium mb-2">Email*</label>
          <Input
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors?.email && errors?.email?.type === "required" && (
            <InputErrorMessage msg="Email is required" />
          )}
          {errors?.email && errors?.email?.type === "pattern" && (
            <InputErrorMessage msg="Not valid email" />
          )}
        </div>

        <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition sticky bottom-0">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordRecovery;
