import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/login", (req, res) => {
    res.send("Login route");
})

router.post("/signup", signup);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;