import { ImageSizeOption } from "../models/image";
import { UseFormRegister } from "react-hook-form";
import { IGalleryInput } from "../models/image";

interface OrientationSelectionProps {
  options: ImageSizeOption[];
  register: UseFormRegister<IGalleryInput>;
}

const OrientationSelection = ({
  options,
  register,
}: OrientationSelectionProps) => {
  return (
    <>
      {options.map((option) => (
        <div
          key={option.id}
          className="flex flex-col justify-center items-center cursor-pointer"
        >
          <input
            {...register("requestedImageSize", {
              required: "You must select an image size",
            })}
            type="radio"
            id={option.id}
            value={option.value}
            className="hidden"
          />
          <label
            htmlFor={option.id}
            className="flex items-center gap-2 justify-center p-2 w-full bg-white border-solid border border-zinc-500 rounded-xl cursor-pointer active:bg-gray-500 active:text-white"
          >
            {option.icon}
            {option.label}
          </label>
          <span className="text-xs mt-2">{option.size}</span>
        </div>
      ))}
    </>
  );
};

export default OrientationSelection;
