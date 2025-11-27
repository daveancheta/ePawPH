import express from "express"
import { follow, getfollowing } from "../controllers/follow.controller.js"

const router = express.Router() 

router.post("/follow", follow)
router.get("/getfollowing", getfollowing)

export default router