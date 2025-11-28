import { AxiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'

interface FollowState {
    followings: Followings[]
    isFollowing: any
    handleFollow: any
    isFollowed: any
    handleUnfollow: any
    isUnFollowing: any
    followingCount: any
    followerCount: any
    countFollowing: any
    countFollower: any
    listFollowing: Following[]
    followingList: any
}

interface Following {
    _id: any
    followingId: any
    followerId: followerId[]
}

interface followerId {
    fullname: any
    profile: any
    username: any
}

interface Followings {
    followingId: string,
    followerId: string
}

export const UseFollowStore = create<FollowState>((set, get) => ({
    isFollowing: false,
    followings: [],
    isUnFollowing: false,
    countFollowing: 0,
    countFollower: 0,
    listFollowing: [],

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
    },

    handleUnfollow: async (data: any) => {
        set({ isUnFollowing: true })

        try {
            AxiosInstance.post("/follow/unfollow", data)

            set((state: any) => ({
                followings: state.followings.filter((followings: any) => followings.followingId !== data.followingId
                    || followings.followerId !== data.followerId)
            }))
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUnFollowing: false })
        }
    },

    followingCount: async () => {
        try {
            const res = await AxiosInstance.get("/follow/followingCount")
            set({ countFollowing: res.data })
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        }
    },

    followerCount: async () => {
        try {
            const res = await AxiosInstance.get("/follow/followerCount")
            set({ countFollower: res.data })
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        }
    },

    followingList: async () => {
        try {
            const res = await AxiosInstance.get("/follow/followingList")
            set({ listFollowing: res.data })
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        }
    }
}))