import Button from "@components/UI/Button";
import InputField from "./InputField";
import { useState } from "react";
import useAxios from "@config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorrEsponse } from "@interfaces";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordSection: React.FC = () => {
  const axiosInstance = useAxios();
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState({
    current_password: false,
    new_password: false,
    confirm_password: false,
  });

  const handlePasswordSubmit = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("Passwords do not match!", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    try {
      const { data } = await axiosInstance.post(
        "/users/change-password/",
        passwordData
      );
      if (data.status === 200) {
        toast.success("Password updated successfully!");
        resetData();
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorrEsponse>;
      toast.error(`${errorObj.response?.data?.message}`, {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const resetData = () => {
    setPasswordData({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (
    field: "current_password" | "new_password" | "confirm_password"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  return (
    <div className="mt-8 px-8">
      <h2 className="text-lg font-bold text-gray-800">Password</h2>
      <p className="text-sm text-gray-500 mt-1">
        Please enter your current password to change your password.
      </p>
      {[
        { label: "Current password", field: "current_password" },
        { label: "New password", field: "new_password" },
        { label: "Confirm new password", field: "confirm_password" },
      ].map(({ label, field }) => (
        <div key={field}>
          <div className="grid grid-cols-5 mt-4 items-center gap-6">
            <label className="text-sm text-gray-500 font-medium">{label}</label>
            <div className="col-span-2 relative">
              <InputField
                type={
                  showPassword[field as keyof typeof showPassword]
                    ? "text"
                    : "password"
                }
                placeholder={`Enter ${label.toLowerCase()}`}
                value={passwordData[field as keyof typeof passwordData]}
                onChange={(value) => handlePasswordChange(field, value)}
              />

              <button
                type="button"
                onClick={() =>
                  togglePasswordVisibility(field as keyof typeof showPassword)
                }
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword[field as keyof typeof showPassword] ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>
          {field === "new_password" && (
            <p className="text-xs text-gray-500">
              Your new password must be more than 8 characters.
            </p>
          )}
          {field === "confirm_password" &&
            passwordData.new_password !== passwordData.confirm_password && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match.
              </p>
            )}
          <hr className="mt-4" />
        </div>
      ))}

      <div className="flex gap-4 mt-4 justify-end">
        <Button label="Cancel" variant="secondary" onClick={resetData} />
        <Button label="Update password" onClick={handlePasswordSubmit} />
      </div>
    </div>
  );
};

export default PasswordSection;
