import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import Follow from "../models/Follow.js";

export const sendMessage = async (req, res) => {
    const { receiverId, text, image } = req.body
    const loggedInUser = req.user._id
    try {

        const imageCloud = cloudinary.uploader.upload(image)
        const newMessage = new Message({
            senderId: loggedInUser,
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

export const getConversation = async (req, res) => {
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
        console.log("Error in get conversation controller:", error)
        res.status(400).json({ message: "Interal server error" })
    }
}

export const getChats = async (req, res) => {
    const loggedInUser = req.user._id
    try {
        const chats = await Follow.find({
            $or: [
                { followingId: loggedInUser }
            ]
        }).populate("followerId", "fullname profile _id");

        res.status(200).json(chats)

    } catch (error) {
        console.log("Error in get chats controller:", error)
        res.status(400).json({ message: "Interal server error" })
    }
}