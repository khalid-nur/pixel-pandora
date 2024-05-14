import "dotenv/config";
import OpenAI from "openai";
import { v2 as cloudinary } from "cloudinary";
import env from "./validateEnv";

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
  secure: true,
});

const openAi = new OpenAI({
  apiKey: env.OPEN_API_KEY,
});

export type ImageSizeType =
  | "256x256"
  | "512x512"
  | "1024x1024"
  | "1792x1024"
  | "1024x1792"
  | undefined;

interface generateImageProp {
  prompt: string;
  requestedImageSize: ImageSizeType;
}

export const generateImage = async ({
  prompt,
  requestedImageSize,
}: generateImageProp) => {
  const imageResponse = await openAi.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: requestedImageSize,
  });

  // Check if the image was successfully generated and contains a url
  if (imageResponse.data[0].url) {
    // Upload the generated image url to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(
      imageResponse.data[0].url,
      {
        // Specify the folder where the image should be stored in cloudinary
        folder: "PixelPandora_Generated_Imagery",
      }
    );

    const { public_id, secure_url } = uploadedImage;

    // Return the public id and secure url of the uploaded image
    return { public_id, secure_url };
  }
};
