export interface IGallery {
  _id: string;
  prompt: string;
  imageSize: string;
  ImageUrl: string;
  publicId: string;
  createdAt: string;
}

export interface IGalleryInput {
  prompt: string;
  requestedImageSize: string;
}
