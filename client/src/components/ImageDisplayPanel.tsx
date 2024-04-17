const ImageDisplayPanel = () => {
  return (
    <>
      <h2 className="text-base font-figtree font-medium text-zinc-700 mb-2 border-b p-4 border-zinc-300">
        Generated Images
      </h2>
      <div className="flex justify-center items-center mt-6 ">
        {false ? (
          <>
            <div className="grid place-items-center text-zinc-500 text-sm font-figtree border-dashed border-2 border-gray-200 m-2 rounded w-full h-64 md:w-2/3 ">
              <p>Your generated images will appear here</p>
            </div>
          </>
        ) : (
          <div className="p-2">
            <div className="flex justify-center">
              <div className=" relative rounded-lg max-w-md min-w-64 inline-block cursor-pointer">
                <img
                  className="w-full rounded-2xl"
                  src={
                    "https://res.cloudinary.com/dpengqdkl/image/upload/v1711162958/ai-art-work/rjjgdy4xoxznrkyajkya.png"
                  }
                  alt=""
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl text-white hover:bg-black/30 opacity-0 hover:opacity-100 ">
                  <div>
                    {/* TODO: Add modal to display to the current image to user  */}
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
