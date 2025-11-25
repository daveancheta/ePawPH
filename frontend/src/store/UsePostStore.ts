import { AxiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"

interface Pet {
    posterId: String,
    name: String,
    gender: String,
    pet_type: String,
    age: Number,
    breed: String,
    color: String,
    petPicture: String,
    lastSeenDate: String,
    lastSeenLocation: String,
    message: String,
}
export const UsePostStore = create((set) => ({
    posts: [],
    isCreatingPost: false,

    post: async () => {
        try {
            const res = await AxiosInstance.get("/post/posts")
            set({ posts: res.data })
        } catch (error) {
            console.log("Error fetching posts")
        }
    },

    handlePetPost: async (data: Pet) => {
        set({ isCreatingPost: true })
        try {
            await AxiosInstance.post("/post/post", data)
            toast.success("Post created successfully")
        } catch (error: any) {
            console.log("Error posting", error)
            toast.error(error.response.data.message)
        } finally {
            set({ isCreatingPost: false })
        }
    }
}))