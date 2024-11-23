import Logo from "@assets/images/Logo.png";
import Input from "@components/UI/Input";
import InputErrorMessage from "@components/UI/InputErrorMessage";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="lg:w-1/2 w-full bg-white flex flex-col justify-center px-8 sm:px-12 py-10">
      <div className="mb-6 ">
        <img src={Logo} alt="Logo" className="h-10 " />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
        Sign up
      </h2>
      <p className="text-gray-600 mb-6 text-center lg:text-left">
        Fill in the information below to get started
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name*</label>
          <Input
            placeholder="Enter your name"
            {...register("name", { required: true, minLength: 5 })}
          />
          {errors?.name && errors?.name?.type === "required" && (
            <InputErrorMessage msg="Name is required" />
          )}
          {errors?.name && errors?.name?.type === "minLength" && (
            <InputErrorMessage msg="Must be at least 5 characters" />
          )}
        </div>
        <div className="mb-4">
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
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password*</label>
          <Input
            placeholder="Create a password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors?.password && errors?.password?.type === "required" && (
            <InputErrorMessage msg="Password is required" />
          )}
          {errors?.password && errors?.email?.type === "pattern" && (
            <InputErrorMessage msg="Not valid password" />
          )}
          {/* <p className="text-xs text-gray-500 mt-2">
          Must be at least 8 characters.
        </p> */}
        </div>
        <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">
          Get started
        </button>
        <div className="text-center mt-4">
          <button className="w-full py-3 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            <img src="/google-icon.png" alt="Google" className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <NavLink to="/login" className="text-purple-600 hover:underline">
            Log in
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
