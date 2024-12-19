import image from "@assets/images/Image.png";
import axiosInstance from "@config/axios.config";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";
import Lightbox from "./Lightbox";
interface IProps {
  images: { image: string }[];
  name: string;
  propertyId: number;
  onRefresh: () => void;
}

const ImagePreview: React.FC<IProps> = ({
  images,
  name,
  propertyId,
  onRefresh,
}) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const fileList = Array.from(files);
      setUploadedImages((prevImages) => [...prevImages, ...fileList]);
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("images", file);
      });
      try {
        const response = await axiosInstance.post(
          `/owners/properties/${propertyId}/images/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          toast.success("Images uploaded successfully!", {
            duration: 2000,
            position: "top-center",
          });
          onRefresh();
        }
      } catch (e) {
        toast.error("Error uploading images. Please try again.");
      }
    }
  };
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const handleNext = () => {
    setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setLightboxIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  return (
    <div className="lg:col-span-3">
      <img
        src={images[0]?.image || image}
        alt={name}
        className="w-full h-64  rounded-lg shadow-md mb-3"
      />
      <div
        className="relative w-full h-44 rounded-lg shadow-md cursor-pointer"
        onClick={() => openLightbox(1)}
      >
        <img
          src={images[1]?.image || image}
          alt={name}
          className="w-full h-full object-cover rounded-lg shadow-md opacity-40"
        />
        {images?.length > 1 ? (
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-3xl font-bold">
            +{images.length - 1}
          </span>
        ) : (
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-3xl font-bold"></span>
        )}
      </div>
      <label
        htmlFor="image-upload"
        className="mt-4 w-full py-2 px-4 flex items-center justify-center bg-white hover:bg-purple-600 text-mainColor hover:text-white font-semibold rounded-lg shadow border-2 border-mainColor cursor-pointer"
      >
        <FiUploadCloud className="mr-2" />
        Upload new image
      </label>
      <input
        id="image-upload"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      {isLightboxOpen && (
        <Lightbox
          closeLightbox={closeLightbox}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          images={images}
          lightboxIndex={lightboxIndex}
        />
      )}
    </div>
  );
};

export default ImagePreview;
