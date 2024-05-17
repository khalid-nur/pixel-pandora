import { useEffect, useState } from "react";
import ModalImage from "../components/ModalImage";
import { IGallery } from "../models/image";
import { getImages } from "../api/imageGeneratorAPI";
import { Link } from "react-router-dom";

function ImageGallery() {
  const [images, setImages] = useState<IGallery[]>([]);
  const [selectedImage, setSelectedImage] = useState<IGallery | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Fetch images from API
        const images = await getImages();

        setImages(images);
      } catch (error) {
        console.error(error);
      }
    };

    loadImages();
  }, []);

  const imageSelectHandler = (image: IGallery) => {
    setSelectedImage(image);
  };

  console.log(images.length);
  console.log(selectedImage);

  return (
    <div className="App">
      <header className=" flex flex-col justify-between  p-2 font-bold md:flex-row border-b border-zinc-300 md:items-center ">
        <p>
          Keep all your created artwork in one spot. Download it whenever you
          want
        </p>
        <div>
          <Link to={"/image-generator"}>
            <button className="flex items-center justify-center bg-black gap-2 text-white font-bold py-2 px-4 rounded-xl mt-3 focus:outline-none focus:shadow-outline">
              Generate Image
            </button>
          </Link>
        </div>
      </header>
      {images.length === 0 && (
        <p className="flex items-center justify-center  h-[calc(100vh-151px)] ">
          No Result of a Image found!
        </p>
      )}

      {images.length > 0 && (
        <div className="container h-[calc(100vh-56px)]  mx-auto px-4 py-4">
          <div className=" grid grid-cols-1 h-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {images.map((image) => (
              <div
                key={image._id}
                className="relative rounded "
                onClick={() => imageSelectHandler(image)}
              >
                <img
                  className=" h-full w-full object-cover rounded-2xl"
                  src={image.ImageUrl}
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl text-white hover:bg-black/30 opacity-0 hover:opacity-100 ">
                  <div>
                    <ModalImage image={selectedImage} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
