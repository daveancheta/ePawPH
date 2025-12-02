import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
    const { senderId, receiverId, text, image } = req.body

    try {

        const imageCloud = cloudinary.uploader.upload(image)
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageCloud
        })

        if (newMessage) {
            newMessage.save()

            res.status(200).json(newMessage)
        }

    } catch (error) {
        console.log("Error in post controller:", error)
        res.status(400).json({ message: "Interal server error" })
    }
}