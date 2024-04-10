import express from "express";
import { getImages } from "../controllers/imagesController";

// Sets up a router instance to define routes
const router = express.Router();

// A route for the GET request to fetch images
router.get("/", getImages);

export default router;
