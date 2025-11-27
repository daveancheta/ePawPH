import express from "express"
import { follow, getFollowing, unfollow } from "../controllers/follow.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router() 

router.post("/follow", follow)
router.get("/following", protectRoute, getFollowing)
router.post("/unfollow", protectRoute, unfollow)

export default router