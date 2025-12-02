import mongoose from "mongoose"

const MesssageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    text: {
        type: String,
        trim: true
    },

    image: {
        type: String,
    }

}, { timestamps: true })

const Message = mongoose.model("Message", MesssageSchema)

export default Message