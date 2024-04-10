import { Schema, model } from "mongoose";

interface IGallery {
  prompt: string;
  imageSize: string;
  ImageUrl: string;
  publicId: string;
}

// Create a schema for the Gallery model,
const GallerySchema = new Schema<IGallery>(
  {
    prompt: { type: String, required: true },
    imageSize: { type: String, required: true },
    ImageUrl: { type: String },
    publicId: { type: String },
  },
  { timestamps: true }
);

export const GalleryModel = model<IGallery>("Gallery", GallerySchema);
