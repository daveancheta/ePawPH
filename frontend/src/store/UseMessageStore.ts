import { AxiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"
import { UseAuthStore } from "./UseAuthStore"

export const UseMessageStore = create((set, get) => ({
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
        set({ isLoadingMessages: true })
        try {
            const res = await AxiosInstance.get(`/message/getConversation/${id}`)
            set({ conversation: res.data })
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        } finally {
            set({ isLoadingMessages: false })
        }
    },

    sendMessage: async (data: any) => {
        const { conversation } = get() as { conversation: any }
        const { auth } = UseAuthStore.getState()

        const tempId = `temp-${Date.now()}`
        const optimisticMessage = {
            _id: tempId,
            senderId: auth._id,
            receiverId: data.receiverId,
            text: data.text,
            image: data.image,
            createdAt: new Date().toISOString(),
        }

        set({ conversation: [...conversation, optimisticMessage] })

        try {
            await AxiosInstance.post("/message/sendMessage", data)
        } catch (error: any) {
            toast.error("Something went wrong")
            console.log("Error sending message", error)
        }
    }
}))