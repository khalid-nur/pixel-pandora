import { Request, Response, NextFunction } from "express";
import { GalleryModel } from "../models/image";
import { generateImage } from "../utils/imageGenerator";
import createHttpError from "http-errors";
import { ImageSizeType } from "../utils/imageGenerator";
import { assertIsDefined } from "../utils/assertIsDefined";

// This function handles requests to fetch all images from the database
export const getImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Ensure the authenticatedUserId is defined
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    // Search in the database for all images connected to the authenticated user and arranged in descending order of creation date.
    const image = await GalleryModel.find({ userId: authenticatedUserId }).sort(
      { createdAt: -1 }
    );
    // Send a 200 OK response along with the found images in json format
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// This function handles requests to create a new image based on user input and stores it in the database
export const createImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { prompt, requestedImageSize } = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    // Ensure the authenticatedUserId is defined
    assertIsDefined(authenticatedUserId);

    // Check if the prompt is provided
    if (!prompt) {
      throw createHttpError(
        400,
        "A prompt is required to generate an image. Please provide a text prompt."
      );
    }

    // Check if the image size is provided
    if (!requestedImageSize) {
      throw createHttpError(
        400,
        "An image size must be specified. Please choose an image size from the available options."
      );
    }

    // Validate imageSize
    const validSizes: ImageSizeType[] = [
      "256x256",
      "512x512",
      "1024x1024",
      "1792x1024",
      "1024x1792",
    ];

    // Check if the provided image size is in the list of valid sizes.
    if (!validSizes.includes(requestedImageSize)) {
      throw createHttpError(
        400,
        `'${requestedImageSize}' is not a valid image size. Please select one of the following sizes: ['256x256', '512x512', '1024x1024', '1024x1792', '1792x1024'].`
      );
    }

    // Generate image using the provided prompt and size
    const generatedImageData = await generateImage({
      prompt,
      requestedImageSize,
    });

    // Create a new gallery image record with the generated image
    const newGalleryImage = await GalleryModel.create({
      userId: authenticatedUserId,
      prompt: prompt,
      imageSize: requestedImageSize,
      ImageUrl: generatedImageData?.secure_url,
      publicId: generatedImageData?.public_id,
    });

    // Send a 201 response with the newly created gallery image
    res.status(201).json(newGalleryImage);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
