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

export const getfollowing = async (req, res) => {
    try {
        const post = await Follow.find().select()

        res.status(200).json(post)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal server error" })
    }
}