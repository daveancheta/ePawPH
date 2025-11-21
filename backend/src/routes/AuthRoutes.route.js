import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;