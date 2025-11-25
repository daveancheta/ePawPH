import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    posterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false,
    },

    age: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false,
    },

    status: {
        type: String,
        required: false,
    },

    petName: {
        type: String,
        required: false
    },

    petType: {
        type: String,
        required: false
    },

    gender: {
        type: String,
        required: false
    },

    breed: {
        type: String,
        required: false
    },

    color: {
        type: String,
        required: false
    },

    lastSeenDate: {
        type: Date,
        required: false
    },

    lastSeenLocation: {
        type: String,
        required: false
    },

    message: {
        type: String,
        required: false
    },

    petPicture: {
        type: String,
        required: true
    },

}, { timestamps: true })

const Post = mongoose.model("Post", PostSchema)

export default Post;