import { MouseEventHandler } from "react";
import image from "@assets/images/Image.png";
interface IProps {
    images: {
        image: string
    }[];
    closeLightbox:MouseEventHandler<HTMLButtonElement>
    lightboxIndex:number
    handlePrevious:()=>void
    handleNext:()=>void
}

const Lightbox: React.FC<IProps> = ({ images,
    closeLightbox,
    handlePrevious,
    lightboxIndex,handleNext}) => {
    return <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <button
      className="absolute top-4 right-4 text-white text-xl"
      onClick={closeLightbox}
    >
      ✕
    </button>
    <button
      className="absolute left-4 text-white text-xl"
      onClick={handlePrevious}
    >
      ‹
    </button>
    <img
      src={images[lightboxIndex]?.image || image}
      alt={` ${lightboxIndex + 1}`}
      className="max-w-3xl h-auto object-cover w-9/12 rounded-lg shadow-md"
    />
    <button
      className="absolute right-4 text-white text-xl"
      onClick={handleNext}
    >
      ›
    </button>
  </div>
};

export default Lightbox;