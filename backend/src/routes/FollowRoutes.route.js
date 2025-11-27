import express from "express"
import { follow, getFollowingByUserId } from "../controllers/follow.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router() 

router.post("/follow", follow)
router.get("/:id", protectRoute, getFollowingByUserId)

export default router