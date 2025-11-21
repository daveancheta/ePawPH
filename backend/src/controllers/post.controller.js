import Post from "../models/Post.js"
import cloudinary from "../lib/cloudinary.js"

export const post = async (req, res) => {
    const { posterId, petName, gender, breed,
        color, lastSeenDate, lastSeenLocation, message, petPicture } = req.body

    try {
        if (!posterId || !petName || !gender || !breed ||
            !color || !lastSeenDate || !lastSeenLocation || !message || !petPicture) {
            return res.status(400).json({ message: "All field are required" })
        }

        const profilePictureCloud = cloudinary.uploader.upload(petPicture)
        const newPost = new Post({
            posterId,
            petName,
            gender,
            breed,
            color,
            lastSeenDate,
            lastSeenLocation,
            message,
            petPicture: profilePictureCloud
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