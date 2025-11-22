import User from "../models/User.js"

export const users = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const fillteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
        const usersCount = await User.find({ _id: { $ne: loggedInUser } }).select("-password").countDocuments()

        res.status(200).json({fillteredUsers, usersCount})
    } catch (error) {

    }
}