import { AxiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const UseMessageStore = create((set) => ({
    chats: [],
    conversation: [],
    selectedUser: null,
    isLoadingMessages: false,

    setSelectedUser: (selectedUser: string) => set({ selectedUser: selectedUser }),

    getChats: async () => {
        try {
            const res = await AxiosInstance.get("/message/getChats")
            set({ chats: res.data })
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        }
    },

    getConversation: async (id: any) => {
        set({ isLoadingMessages: true})
        try {
            const res = await AxiosInstance.get(`/message/getConversation/${id}`)
            set({ conversation: res.data })
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        } finally {
            set({ isLoadingMessages: false })
        }
    }
}))