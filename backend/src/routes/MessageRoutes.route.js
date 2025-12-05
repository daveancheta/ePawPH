import express from "express"
import { getChats, getConversation, sendMessage } from "../controllers/message.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/sendMessage", protectRoute, sendMessage)
router.get("/getConversation/:id", protectRoute, getConversation)
router.get("/getChats", protectRoute, getChats)

export default router