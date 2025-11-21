import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

    profile: {
        type: String,
        required: false,
        default: "",
    },

}, { timestamps: true })

const Users = mongoose.model("Users", UserSchema)

export default Users;