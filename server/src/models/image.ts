import { ObjectId, Schema, model } from "mongoose";

interface IGallery {
  userId: ObjectId; // Id of the user who owns the image
  prompt: string;
  imageSize: string;
  ImageUrl: string;
  publicId: string;
}

// Create a schema for the Gallery model,
const GallerySchema = new Schema<IGallery>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    prompt: { type: String, required: true },
    imageSize: { type: String, required: true },
    ImageUrl: { type: String },
    publicId: { type: String },
  },
  { timestamps: true }
);

export const GalleryModel = model<IGallery>("Gallery", GallerySchema);
