import ImageCreationPanel from "../components/ImageCreationPanel";
import ImageDisplayPanel from "../components/ImageDisplayPanel";

const ImageGenerator = () => {
  return (
    <main>
      <div className=" max-w-full mx-auto h-[calc(100vh-56px)] ">
        <div className="flex flex-col h-full lg:flex-row justify-between">
          {/* Left Side */}
          <div className="lg:w-1/3 p-4 bg-[#F5F3F2]">
            <ImageCreationPanel />
          </div>
          {/* Right Side */}
          <div className="lg:w-2/3 ">
            <ImageDisplayPanel />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImageGenerator;
