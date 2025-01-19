
import FileUpload from "@components/Settings/FileUpload";
import InputField from "@components/Settings/InputField";
import MyDetailsButton from "@components/Settings/MyDetailsButton";
import PasswordSection from "@components/Settings/PasswordSection";
import ProfilePhoto from "@components/Settings/ProfilePhoto";
import Button from "@components/UI/Button";
import PagesHeading from "@components/UI/PagesHeading";
import SubHeading from "@components/UI/SubHeading";
import useAxios from "@config/axios.config";
import useCustomQuery from "@hooks/useCustomQuery";
import { IErrorrEsponse } from "@interfaces";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMail } from "react-icons/hi";

const SettingsPage: React.FC = () => {
  const axiosInstance = useAxios();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null |string>(null);
  const [userDoc, setUserDoc] = useState<File | null>(null);
  const { data,isSuccess  } = useCustomQuery({
    queryKey: ["user-details"],
    url: "/users/details/",
  });
  const handlePasswordSubmit = async () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("emergency_number", emergencyNumber);
    formData.append('address',address)
    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }
    if (userDoc) {
      formData.append("user_doc", userDoc);
    }
    try {
      const response = await axiosInstance.put("/users/update/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorrEsponse>;
      toast.error(`${errorObj.response?.data?.message}`, {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const handleDelete = () => {
    console.log("Delete button clicked");

  };
  const handleFileUpload = (file: File, type: string) => {
    if (type === "photo") {
      setProfilePhoto(file);
    } else if (type === "doc") {
      setUserDoc(file);
    }
  };
  useEffect(() => {
    if (isSuccess && data?.data) {
      const userDetails=data?.data
      setFirstName(userDetails.first_name || "");
      setLastName(userDetails.last_name || "");
      setEmail(userDetails.email || "");
      setPhoneNumber(userDetails.phone_number || "");
      setEmergencyNumber(userDetails.emergency_number || "");
      setProfilePhoto(userDetails.profile_photo || "");
      setUserDoc(userDetails.user_doc || "");
      setAddress(userDetails.address || "");
     
    }
  }, [isSuccess, data]);
  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Settings" />
      <MyDetailsButton />
      <h4 className="mt-8 font-semibold">Profile</h4>
      <SubHeading subHeading="Update your photo and personal details here." />
      <hr />
      <div className="grid grid-cols-5 mt-8 items-center gap-6">
        <label className="text-sm text-gray-600 font-medium">Name</label>

        <div className="flex gap-6 col-span-2">
          <InputField
            value={firstName}
            placeholder="First Name"
            onChange={(value) => setFirstName(value)}
          />
          <InputField
            value={lastName}
            placeholder="Last Name"
            onChange={(value) => setLastName(value)}
          />
        </div>
        <div className="col-span-2"></div>
        <label className="text-sm text-gray-600 font-medium">
          Email address
        </label>
        <div className="col-span-2">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border  text-gray-600 text-sm">
              <HiOutlineMail className="text-lg" />
            </span>
            <input
              type="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-r-md   focus:ring-2 focus:ring-purple-500 focus:outline-none py-2 px-4 text-sm"
            />
          </div>
        </div>

        <div className="col-span-2"></div>
      </div>
      <hr className="mt-4 " />
      <div className="grid grid-cols-5 mt-4 items-center gap-6">
        <label className="text-sm text-gray-600 font-medium">
        Address
        </label>
        <div className="col-span-2">
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              value={address}
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none py-2 px-4 text-sm"
            />
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
      <hr className="mt-4 " />
      <div className="grid grid-cols-5 mt-4 items-center gap-6">
        <label className="text-sm text-gray-600 font-medium">
          Phone Number
        </label>
        <div className="col-span-2">
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              value={phoneNumber}
              placeholder="Enter phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none py-2 px-4 text-sm"
            />
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
      <hr className="mt-4 " />
      <div className="grid grid-cols-5 mt-4 items-center gap-6">
        <label className="text-sm text-gray-600 font-medium">
          Emergency Number
        </label>
        <div className="col-span-2">
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              value={emergencyNumber}
              placeholder="Enter emergency number"
              onChange={(e) => setEmergencyNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none py-2 px-4 text-sm"
            />
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
      {/* <hr className="mt-4 " />
      <div className="grid grid-cols-5 mt-4 items-center gap-6">
        <label className="text-sm text-gray-600 font-medium">Website</label>
        <div className="col-span-2">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-100 text-gray-600 text-sm">
              http://
            </span>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full rounded-r-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none py-2 px-4 text-sm"
            />
          </div>
        </div>
        <div className="col-span-2"></div>
      </div> */}
      <hr className="mt-4 " />
      <div className="grid grid-cols-5 mt-4 items-center gap-6">
        <div>
          <label className="text-sm text-gray-600 font-medium">
            Your photo
          </label>
          <p className="text-xs text-gray-500">
            This will be displayed on your profile.
          </p>
        </div>
        <div className="col-span-2">
          <ProfilePhoto
            src={profilePhoto as string}
            onUpdate={(file) => handleFileUpload(file, "photo")}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <hr className="mt-4 " />
      <div className="grid grid-cols-5 mt-4 items-center gap-6">
        <div>
          <label className="text-sm text-gray-600 font-medium">
            Documents upload
          </label>
          <p className="text-xs text-gray-500">
            upload documents in this section{" "}
          </p>
        </div>
        <div className="col-span-2">
          <FileUpload onUpload={(file) => handleFileUpload(file as File, "doc")} />
          {/* {userDoc && (
            <DocumentStatus
              fileName={userDoc.name}
              fileSize={`${userDoc.size / 1024} KB`}
            />
          )} */}
        </div>
      </div>
      <hr className="mt-4" />
      <PasswordSection />
      <hr className="mt-4 " />
      <div className="flex gap-4 mt-4 justify-end">
        <Button label="Cancel" variant="secondary" />
        <Button label="Save" onClick={handlePasswordSubmit} />
      </div>
    </div>
  );
};

export default SettingsPage;
