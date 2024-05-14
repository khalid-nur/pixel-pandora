// import { useState, useEffect } from "react";
import { IGallery } from "../models/image";
import { ClipLoader } from "react-spinners";
import { CiImageOff } from "react-icons/ci";
import ModalImage from "./ModalImage";
import { useState } from "react";
interface ImageDisplayPanelProps {
  images: IGallery[];
  isImageLoading: boolean;
  showImageLoadingError: boolean;
}

const ImageDisplayPanel = ({
  images,
  isImageLoading,
  showImageLoadingError,
}: ImageDisplayPanelProps) => {
  const [selectedImage, setSelectedImage] = useState<IGallery | null>(null);

  const imageSelectHandler = (image: IGallery) => {
    setSelectedImage(image);
  };

  return (
    <>
      <h2 className="text-base font-figtree font-medium text-zinc-700 mb-2 border-b p-4 border-zinc-300">
        Generated Images
      </h2>
      {isImageLoading && (
        <div className="flex items-center justify-center h-1/2">
          <ClipLoader size={35} />
        </div>
      )}

      <div className="flex justify-center items-center mt-6 ">
        {images.length === 0 && !isImageLoading ? (
          <>
            <div className="grid place-items-center text-zinc-500 text-sm font-figtree border-dashed border-2 border-gray-200 m-2 rounded w-full h-64 md:w-2/3 ">
              {showImageLoadingError ? (
                <p className="flex flex-col items-center justify-center h-1/2 font-figtree font-medium text-zinc-700">
                  <CiImageOff size={40} />
                  Error loading image. Please refresh the page.
                </p>
              ) : (
                <p>Your generated image will appear here</p>
              )}
            </div>
          </>
        ) : (
          <div className="p-2">
            <div className="flex justify-center">
              <div
                className=" relative rounded-lg max-w-md min-w-64 inline-block cursor-pointer"
                onClick={() => imageSelectHandler(images[0])}
              >
                <img
                  className="w-full rounded-2xl"
                  src={`${images[0]?.ImageUrl}`}
                  alt=""
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl text-white hover:bg-black/30 opacity-0 hover:opacity-100 ">
                  <div>
                    <ModalImage image={selectedImage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageDisplayPanel;
