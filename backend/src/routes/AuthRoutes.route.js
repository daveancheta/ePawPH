import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/login", (req, res) => {
    res.send("Login route");
})

router.post("/signup", signup);

export default router;