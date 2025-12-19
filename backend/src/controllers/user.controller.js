import User from "../models/User.js"

export const users = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in users controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}