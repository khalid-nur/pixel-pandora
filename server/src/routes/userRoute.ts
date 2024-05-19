import express from "express";
import { signup } from "../controllers/usersController";

const router = express.Router();

// POST route to handle user signup
router.post("/signup", signup);

export default router;
