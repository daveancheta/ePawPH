import { AxiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'

interface FollowState {
    followings: any
    isFollowing: any
}

export const UseFollowStore = create<FollowState>((set, get) => ({
    isFollowing: false,
    followings: [],

    handleFollow: async (data: any) => {
        set({ isFollowing: true })

        const { followings } = get()

        const tempId = `temp-${Date.now()}`
        const optimisticFollowing = {
            _id: tempId,
            followingId: data.followingId,
            followerId: data.followerId,
            createdAt: new Date().toISOString(),
        }

        set({ followings: [...followings, optimisticFollowing] })

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