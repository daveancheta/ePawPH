import express from "express"
import { getMessages, sendMessage } from "../controllers/message.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/sendMessage", sendMessage)
router.get("/getMessages/:id", protectRoute, getMessages)

export default router