import express from "express"
import { follow, followerCount, followerList, followingCount, followingList, getFollowing, unfollow } from "../controllers/follow.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router() 

router.post("/follow", follow)
router.get("/following", protectRoute, getFollowing)
router.post("/unfollow", protectRoute, unfollow)
router.get("/followingCount", protectRoute, followingCount)
router.get("/followerCount", protectRoute, followerCount)
router.get("/followingList", protectRoute, followingList)
router.get("/followerList", protectRoute, followerList)

export default router