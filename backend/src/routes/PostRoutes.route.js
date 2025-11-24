import express from "express"
import { getPosts, post } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/post", post)
router.get("/posts", getPosts)

export default router;