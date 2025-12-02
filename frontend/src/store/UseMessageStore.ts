import { AxiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const UseMessageStore = create((set) => ({
    chats: [],

    getChats: async () => {
        try {
            const res = await AxiosInstance.get("/message/getChats")
            set({ chats: res.data})
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
}))