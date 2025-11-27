import { AxiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'

export const UseFollowStore = create((set) => ({
    isFollowing: false,
    followings: [],

    handleFollow: async (data: any) => {
        set({ isFollowing: true })

        try {
            await AxiosInstance.post("/follow/follow", data)
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        } finally {
            set({ isFollowing: false })
        }
    },

    isFollowed: async () => {
        try {
            const res = await AxiosInstance.get("/follow/following")
            set({ followings: res.data })
        } catch (error: any) {
            toast.error(error.response.data.message || "Error fetching followings")
        }
    }

}))