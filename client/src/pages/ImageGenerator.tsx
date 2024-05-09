import { useEffect, useState } from "react";
import ImageCreationPanel from "../components/ImageCreationPanel";
import ImageDisplayPanel from "../components/ImageDisplayPanel";
import { IGallery } from "../models/image";
import { getImages } from "../api/imageGeneratorAPI";

const ImageGenerator = () => {
  const [images, setImages] = useState<IGallery[]>([]);
  const [refreshImages, setRefreshImages] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showImageLoadingError, setShowImageLoadingError] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setShowImageLoadingError(false);
        setIsImageLoading(true);
        // Fetch images from API
        const images = await getImages();

        setImages(images);
        setIsImageLoading(false);
      } catch (error) {
        console.error(error);
        setShowImageLoadingError(true);
        setIsImageLoading(false);
      }
    };

    loadImages();
  }, [refreshImages]);

  const imageRefreshHandler = () => {
    setRefreshImages((prev) => !prev);
  };

  console.log(images);
  return (
    <main>
      <div className=" max-w-full mx-auto h-[calc(100vh-56px)] ">
        <div className="flex flex-col h-full lg:flex-row justify-between">
          {/* Left Side */}
          <div className="lg:w-1/3 p-4 bg-[#F5F3F2]">
            <ImageCreationPanel onImageUpdate={imageRefreshHandler} />
          </div>
          {/* Right Side */}
          <div className="lg:w-2/3 ">
            <ImageDisplayPanel
              images={images}
              isImageLoading={isImageLoading}
              showImageLoadingError={showImageLoadingError}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImageGenerator;
