import { AxiosInstance } from "@/lib/axios"
import { create } from "zustand"

export const UsePostStore = create((set) => ({
    posts: [],

    post: async () => {
        try {
            const res = await AxiosInstance.get("/post/posts")
            set({ posts: res.data })
        } catch (error) {
            console.log("Error fetching posts")
        }
    }
}))