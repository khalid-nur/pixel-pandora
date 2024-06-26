import express from "express";
import {
  getAuthenticatedUser,
  login,
  logout,
  signup,
} from "../controllers/usersController";
import { requiredAuth } from "../middleware/auth";

const router = express.Router();

// GET route to get the authenticated user's data
router.get("/", requiredAuth, getAuthenticatedUser);

// POST route to handle user signup
router.post("/signup", signup);

// POST route to handle user login
router.post("/login", login);

// POST route to handle user logout
router.post("/logout", logout);

export default router;
