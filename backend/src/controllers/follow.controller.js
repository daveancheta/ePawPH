import Follow from "../models/Follow.js"

export const follow = async (req, res) => {
    const { followingId, followerId } = req.body
    try {

        if (!followingId, !followerId) {
            res.status(400).json({ message: "following and follower id is required" })
        }

        const newFollowing = new Follow({
            followingId,
            followerId
        })

        if (newFollowing) {
            await newFollowing.save()

            res.status(200).json(newFollowing)

        }

    } catch (error) {
        console.log("Error in follow controller", error)
        res.status(400).json({ message: "Internal server error" })
    }
}

export const getFollowing = async (req, res) => {
    try {
        const loggedInUser = req.user._id

        const follows = await Follow.find({
            $or: [{ followingId: loggedInUser }]
        })

        res.status(200).json(follows)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal server error" })
    }
}

export const unfollow = async (req, res) => {
    const { followingId, followerId } = req.body
    try {
        await Follow.findOneAndDelete({
            followingId,
            followerId
        })

        res.status(200).json({ message: "Unfollowed successfully" })

    } catch (error) {
        console.log("Error in unfollow controller", error)
        res.status(400).json({ message: "Internal server error" })
    }
}

export const followingCount = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const followingCount = await Follow.find({
            $or: [{ followingId: loggedInUser }]
        }).countDocuments()

        res.status(200).json(followingCount)
    } catch (error) {
        console.log("Error in following count controller", error)
        res.status(400).json({ message: "Internal server error" })
    }
}