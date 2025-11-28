import mongoose from "mongoose"

const FollowSchema = new mongoose.Schema({
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
}, { timestamps: true })

const Follow = mongoose.model("Follow", FollowSchema)
export default Follow