import express from "express";
import { login, signup } from "../controllers/usersController";

const router = express.Router();

// POST route to handle user signup
router.post("/signup", signup);

// POST route to handle user login
router.post("/login", login);

export default router;
