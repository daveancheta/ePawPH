import Post from "../models/Post.js"
import cloudinary from "../lib/cloudinary.js"

export const post = async (req, res) => {
    const { posterId, age, status, petName, petType, gender, breed,
        color, lastSeenDate, lastSeenLocation, message, petPicture } = req.body

    try {

        if (!petName || !petType || !age || !breed || !color || !petPicture
            || !lastSeenDate || !lastSeenLocation
            || !lastSeenDate || !message) {
            return res.status(400).json({ message: "All fields are required" })
        }
        
        const petPictureCloud = await cloudinary.uploader.upload(petPicture)
        const newPost = new Post({
            posterId,
            status,
            petName,
            petType,
            gender,
            breed,
            color,
            lastSeenDate,
            lastSeenLocation,
            message,
            petPicture: petPictureCloud.secure_url
        })

        if (newPost) {
            await newPost.save();

            res.status(200).json(newPost)
        }

    } catch (error) {
        console.log("Error in post controller:", error)
        res.status(400).json({ message: "Interal server error" })
    }
}

export const getPosts = async (_, res) => {

    try {
        const post = await Post.find().select().populate("posterId", "fullname profile _id");
        res.status(200).json(post)
    } catch (error) {
        console.log("Error in get posts controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
