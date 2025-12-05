import mongoose from "mongoose"

const MesssageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },

    text: {
        type: String,
        default: "",
        trim: true
    },

    image: {
        type: String,
        default: ""
    }

}, { timestamps: true })

const Message = mongoose.model("Message", MesssageSchema)

export default Message