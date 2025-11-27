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
export const UsePostStore = create((set, get) => ({
    posts: [],
    isCreatingPost: false,
    isCheckingPost: true,
    isDeletingPost: true,

    post: async () => {
        try {
            const res = await AxiosInstance.get("/post/posts")
            set({ posts: res.data })
        } catch (error) {
            console.log("Error fetching posts")
        } finally {
            set({ isCheckingPost: false })
        }
    },

    handlePetPost: async (data: Pet) => {
        set({ isCreatingPost: true })
        try {
            const res = await AxiosInstance.post("/post/post", data)
            toast.success("Post created successfully")
            set({ posts: res.data })
        } catch (error: any) {
            console.log("Error posting", error)
            toast.error(error.response.data.message)
        } finally {
            set({ isCreatingPost: false })
        }
    },

    handleDeletePost: async (postId: string) => {
        set({ isDeletingPost: true })

        try {
            await AxiosInstance.delete(`post/post/${postId}`)

            set((state: any) => ({
            posts: state.posts.filter((post: any) => post._id !== postId)
        }));
        
            toast.success("Post deleted successfully")
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        } finally {
            set({ isDeletingPost: false })
        }
    }
}))