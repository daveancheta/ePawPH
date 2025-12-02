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
        console.log("Error in send message controller:", error)
        res.status(400).json({ message: "Interal server error" })
    }
}

export const getMessages = async (req, res) => {
    const loggedInUser = req.user._id
    const { id: UserToChatId } = req.params

    try {
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUser, receiverId: UserToChatId },
                { senderId: UserToChatId, receiverId: loggedInUser }
            ]
        })

        res.status(200).json(messages)
        
    } catch (error) {
        console.log("Error in get message controller:", error)
        res.status(400).json({ message: "Interal server error" })
    }
}