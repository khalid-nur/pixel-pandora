import express from "express";
import { getImages, createImage } from "../controllers/imagesController";

// Sets up a router instance to define routes
const router = express.Router();

// GET route to retrieve a list of images
router.get("/", getImages);

// POST route to create a new image
router.post("/", createImage);

export default router;
