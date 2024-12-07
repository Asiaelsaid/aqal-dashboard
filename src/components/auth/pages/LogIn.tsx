import Logo from "@assets/images/Logo.png";
import googleIcon from "@assets/images/googleIcon.png";
import Input from "@components/UI/Input";
import InputErrorMessage from "@components/UI/InputErrorMessage";
import axiosInstance from "@config/axios.config";
import { LoginFormData } from "@data";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}
const LogInComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // Send a POST request to login API
      const response = await axiosInstance.post("/users/login/", {
        email: data.email,
        password: data.password,
      });

      // Extract the token from the response (assuming it's in response.data.token)
      const { access } = response.data.data;
      localStorage.setItem("authToken", access);

      // Optionally store the user info or other data if returned by the API
      // localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect the user to the dashboard or home page after login
      navigate("/"); // Or your desired route
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  const renderLoginForm = LoginFormData.map(
    ({ name, placeholder, validation }, idx) => {
      return (
        <div
          key={idx}
          className="mb-4 "
        >
          <label className="block text-sm font-medium mb-2">{name}*</label>
          <Input placeholder={placeholder} {...register(name, validation)} />
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
        <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">
          Login
        </button>
        <div className="text-center mt-4">
          <button className="w-full py-3 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            <img src={googleIcon} alt="Google" className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>
        </div>
        {/* <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <NavLink to="/sign-up" className="text-purple-600 hover:underline">
            Sign up
          </NavLink>
        </p> */}
      </form>
    </div>
  );
};

export default LogInComponent;
