import image from "@assets/images/Image.png";
import { FiUploadCloud } from "react-icons/fi";
interface IProps {
  images: { image: string }[];
  name: string;
}

const ImagePreview: React.FC<IProps> = ({ images, name }) => {
  return (
    <div className="lg:col-span-3">
      <img
        src={images[0]?.image || image}
        alt={name}
        className="w-full h-64  rounded-lg shadow-md mb-3"
      />
      <div className="relative w-full h-44 rounded-lg shadow-md">
        <img
          src={images[1]?.image || image}
          alt={name}
          className="w-full h-full object-cover rounded-lg shadow-md opacity-40"
        />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-3xl font-bold">
          +6
        </span>
      </div>
      <button className="mt-4 w-full py-2 px-4 flex items-center justify-center bg-white hover:bg-purple-600 text-mainColor hover:text-white font-semibold rounded-lg shadow border-2 border-mainColor">
        <FiUploadCloud className="mr-2" />
        Upload new image
      </button>
    </div>
  );
};

export default ImagePreview;
