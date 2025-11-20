import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: string,
        required: true,
    },

    gender: {
        type: string,
        required: true,
    },

    email: {
        type: string,
        required: true,
        unique: true,
    },

    password: {
        type: string,
        required: true,
        unique: true,
    },

    profile: {
        type: string,
        required: false,
        default: "",
    },

}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

export default UserSchema;