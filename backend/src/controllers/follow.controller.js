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

export const getFollowingByUserId = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const { id: userToFollowId } = req.params

        const follows = await Follow.find({
            $or: [
                { followingId: loggedInUser, followerId: userToFollowId },
                { followingId: userToFollowId, followerId: loggedInUser }
            ]
        })

        res.status(200).json(follows)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal server error" })
    }
}