import React, { useState } from "react";
import { GoSquare } from "react-icons/go";
import { ImMagicWand } from "react-icons/im";
import {
  LuRectangleHorizontal,
  LuRectangleVertical,
  LuSquare,
} from "react-icons/lu";

const ImageCreationPanel = () => {
  const [orientation, setOrientation] = useState<string>("");
  const [prompt, setPrompt] = useState("");

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(orientation);
    console.log(prompt);
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl text-center text-zinc-700 font-redHat font-bold  mb-8 md:text-3xl">
          Generate Image to Spark Your Creative Genius!
        </h1>
        {orientation}
      </div>

      <div className="mb-4">
        <form id="createImage" onSubmit={onsubmit}>
          <p className=" text-zinc-500 text-sm font-figtree font-medium mb-4">
            Image Prompt
          </p>
          <textarea
            id="imagePrompt"
            rows={10}
            className=" border rounded w-full py-2 px-3 text-gray-700 font-figtree  leading-tight resize-none shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Briefly explain the image you want to generate for you..."
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>

          <p className=" text-zinc-500 text-sm font-figtree font-medium  mb-4">
            Orientation
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col justify-center items-center ">
              <input
                type="radio"
                id="horizontal"
                name="orientation"
                value="1792x1024"
                className="hidden   "
                onChange={(e) => {
                  setOrientation(e.target.value);
                }}
              />
              <label
                htmlFor="horizontal"
                className="flex items-center gap-2 justify-center p-2 w-full text-zinc-700 font-figtree  bg-white border-solid border border-zinc-500 rounded-xl cursor-pointer active:bg-gray-500 active:text-white "
              >
                <LuRectangleHorizontal />
                Horizontal
              </label>
              <span className="text-xs  text-zinc-500  font-figtree mt-2">
                1792x1024
              </span>
            </div>

            <div className="flex flex-col justify-center items-center cursor-pointer ">
              <input
                type="radio"
                id="Vertical"
                name="orientation"
                value="1024x1792"
                className="hidden "
                onChange={(e) => {
                  setOrientation(e.target.value);
                }}
              />
              <label
                htmlFor="Vertical"
                className="flex items-center gap-2 justify-center p-2 w-full font-figtree text-zinc-700   bg-white border-solid border border-zinc-500 rounded-xl cursor-pointer active:bg-gray-500 active:text-white"
              >
                <LuRectangleVertical />
                Vertical
              </label>

              <span className="text-xs  text-zinc-500 font-figtree mt-2">
                1024x1792
              </span>
            </div>

            <div className="flex flex-col justify-center items-center cursor-pointer  ">
              <input
                type="radio"
                id="Square"
                name="orientation"
                value="1024x1024"
                className="hidden "
                onChange={(e) => {
                  setOrientation(e.target.value);
                }}
              />
              <label
                htmlFor="Square"
                className="flex items-center gap-2 justify-center p-2 w-full text-zinc-700  font-figtree  bg-white border-solid border border-zinc-500 rounded-xl cursor-pointer active:bg-gray-500 active:text-white"
              >
                <LuSquare />
                Square
              </label>

              <span className="text-xs  text-zinc-500 font-figtree mt-2">
                1024x1024
              </span>
            </div>

            <div className="flex flex-col justify-center items-center cursor-pointer  ">
              <input
                type="radio"
                id="Panoramic"
                name="orientation"
                value="512x512"
                className="hidden "
                onChange={(e) => {
                  setOrientation(e.target.value);
                }}
              />
              <label
                htmlFor="Panoramic"
                className="flex items-center gap-2 justify-center p-2 w-full text-zinc-700  font-figtree  bg-white border-solid border border-zinc-500 rounded-xl cursor-pointer active:bg-gray-500 active:text-white"
              >
                <GoSquare />
                Mini square
              </label>

              <span className="text-xs  text-zinc-500 font-figtree mt-2">
                512x512
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center cursor-pointer ">
        <button
          form="createImage"
          type="submit"
          className="flex items-center justify-center bg-black gap-2 text-white font-figtree font-bold  py-2 px-4 rounded-xl  w-56 mt-8 focus:outline-none focus:shadow-outline"
        >
          <ImMagicWand />
          Generate
        </button>
      </div>
    </>
  );
};

export default ImageCreationPanel;
