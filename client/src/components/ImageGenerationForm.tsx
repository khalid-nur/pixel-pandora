import { useForm } from "react-hook-form";
import {
  LuRectangleVertical,
  LuSquare,
  LuRectangleHorizontal,
} from "react-icons/lu";
import { GoSquare } from "react-icons/go";
import { ImMagicWand } from "react-icons/im";
import { IGalleryInput } from "../models/image";
import OrientationSelection from "./OrientationSelection";
import { ImageSizeOption } from "../models/image";
import { createImage } from "../api/imageGeneratorAPI";
import { SyncLoader } from "react-spinners";

interface ImageGenerationFormProps {
  onImageUpdate: () => void;
}
const ImageGenerationForm = ({ onImageUpdate }: ImageGenerationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IGalleryInput>();

  const onSubmit = async (input: IGalleryInput) => {
    try {
      await createImage(input);
      onImageUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const options: ImageSizeOption[] = [
    {
      id: "horizontal",
      value: "1792x1024",
      icon: <LuRectangleHorizontal />,
      label: "Horizontal",
      size: "1792x1024",
    },
    {
      id: "vertical",
      value: "1024x1792",
      icon: <LuRectangleVertical />,
      label: "Vertical",
      size: "1024x1792",
    },
    {
      id: "square",
      value: "1024x1024",
      icon: <LuSquare />,
      label: "Square",
      size: "1024x1024",
    },
    {
      id: "panoramic",
      value: "512x512",
      icon: <GoSquare />,
      label: "Mini square",
      size: "512x512",
    },
  ];

  return (
    <>
      <form id="createImage" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-zinc-500 text-sm font-mont  mb-4">Image Prompt</p>
        <textarea
          required
          {...register("prompt")}
          rows={10}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight resize-none focus:outline-none focus:shadow-outline"
          placeholder="Briefly explain the image you want to generate for you..."
        ></textarea>

        {errors.requestedImageSize && (
          <p className="text-sm font-mont text-red-500  italic">
            {errors.requestedImageSize.message}
          </p>
        )}

        <p className="text-zinc-500 text-sm font-mont font-medium mb-4">
          Orientation
        </p>
        <div className="grid grid-cols-2 gap-3">
          <OrientationSelection options={options} register={register} />
        </div>
        <div className="flex items-center justify-center cursor-pointer ">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center bg-black gap-2 text-white font-bold py-2 px-4 rounded-xl w-56 mt-8 focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                Generate
                <SyncLoader
                  size={5}
                  margin={1}
                  speedMultiplier={0.5}
                  color="#fff"
                />
              </div>
            ) : (
              <>
                Generate
                <ImMagicWand />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ImageGenerationForm;
