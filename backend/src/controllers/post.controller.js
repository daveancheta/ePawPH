import Post from "../models/Post.js"
import cloudinary from "../lib/cloudinary.js"

export const post = async (req, res) => {
    const { posterId, petName, gender, breed,
        color, lastSeenDate, lastSeenLocation, message, petPicture } = req.body

    try {
        const petPictureCloud = cloudinary.uploader.upload(petPicture)
        const newPost = new Post({
            posterId,
            petName,
            gender,
            breed,
            color,
            lastSeenDate,
            lastSeenLocation,
            message,
            petPicture: petPictureCloud
        })

        if (newPost) {
            await newPost.save();

            res.status(200).json({
                posterId: newPost.posterId,
                petName: newPost.petName,
                gender: newPost.gender,
                breed: newPost.breed,
                color: newPost.color,
                lastSeenDate: newPost.lastSeenDate,
                lastSeenLocation: newPost.lastSeenLocation,
                message: newPost.message,
                petPicture: newPost.petPicture
            })
        }

    } catch (error) {
        console.log("Error in post controller:", error)
        res.status(400).json({ message: "Interal server error" })
    }
}

export const getPosts = async (_, res) => {

    try {
        const post = await Post.find().select().populate("posterId", "fullname profile");
        res.status(200).json(post)
    } catch (error) {
        console.log("Error in get posts controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
