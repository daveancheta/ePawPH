import express from "express"
import { follow, followingCount, getFollowing, unfollow } from "../controllers/follow.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router() 

router.post("/follow", follow)
router.get("/following", protectRoute, getFollowing)
router.post("/unfollow", protectRoute, unfollow)
router.get("/followingCount", protectRoute, followingCount)

export default router