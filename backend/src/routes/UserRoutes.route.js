import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { users } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/users", protectRoute, users)
export default router