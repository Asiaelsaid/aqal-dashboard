import Logo from "@assets/images/Logo.png";
import Input from "@components/UI/Input";
import InputErrorMessage from "@components/UI/InputErrorMessage";
import axiosInstance from "@config/axios.config";
import { LoginFormData } from "@data";
import { yupResolver } from "@hookform/resolvers/yup";
import { IErrorrEsponse } from "@interfaces";
import { login } from "@store/auth/authSlice";
import { loginSchema } from "@validation";
import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}
const LogInComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  //handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/login/", {
        email: data.email,
        password: data.password,
      });
      if (response.data.status === 200) {
        const token = response.data.data.access;
        dispatch(
          login({
            token,
          })
        );
        // dispatch(logout());
        localStorage.setItem("authToken", token);
        toast.success("Login successful!", {
          duration: 1000,
          position: "top-center",
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorrEsponse>;
      console.log(errorObj);

      toast.error(`${errorObj.response?.data?.message}`, {
        duration: 3000,
        position: "top-center",
      });
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  //reders
  const renderLoginForm = LoginFormData.map(
    ({ name, placeholder, type, validation }, idx) => {
      return (
        <div key={idx} className="mb-4 ">
          <label className="block text-sm font-medium mb-2">{name}*</label>
          <div className="relative">
            <Input
             type={name === "password" && isPasswordVisible ? "text" : type}
        
              placeholder={placeholder}
              {...register(name, validation)}
            />
            {name === "password" && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
          </div>
          {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
        </div>
      );
    }
  );

  return (
    <div className="lg:w-1/2 w-full bg-white flex flex-col justify-center px-8 sm:px-12 py-10">
      <div className="mb-6 ">
        <img src={Logo} alt="Logo" className="h-10 " />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
        Login
      </h2>
      <p className="text-gray-600 mb-6 text-center lg:text-left">
        Fill in the required information to login
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}
        <button
          className={`w-full bg-purple-600 text-white py-3 rounded-lg font-medium transition ${
            isLoading
              ? "bg-purple-600 cursor-not-allowed"
              : "hover:bg-purple-500"
          } flex justify-center items-center`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default LogInComponent;
