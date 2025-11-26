import express from "express"
import { getPosts, post, deletePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/post", post)
router.get("/posts", getPosts)
router.delete("/post/:id", deletePost)

export default router;