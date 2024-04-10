import { Request, Response, NextFunction } from "express";
import { GalleryModel } from "../models/image";

// This function handles requests to fetch all images from the database
export const getImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Finds all images in the database
    const image = await GalleryModel.find();
    // Send a 200 OK response along with the found images in json format
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
