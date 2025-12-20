import { AxiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"
import { UseAuthStore } from "./UseAuthStore"

interface MessageState {
    chats: any,
    conversation: any,
    selectedUser: any,
    isLoadingMessages: boolean,
    setSelectedUser: any,
    getConversation: any,
    sendMessage: any,
    unsubscribeFromMessages: any,
    subscribeToMessages: any,
    getChats: any,
    chatContainer: any,
    setChatContainer: any,
}

export const UseMessageStore = create<MessageState>((set, get) => ({
    chats: [],
    conversation: [],
    selectedUser: null,
    isLoadingMessages: false,
    chatContainer: null,

    setSelectedUser: (selectedUser: string) => set({ selectedUser: selectedUser }),
    setChatContainer: (chatContainer: string) => set({ chatContainer: chatContainer }),

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
    },

    subscribeToMessages: () => {
    const { selectedUser } = get()
    if (!selectedUser) return;

    const socket = UseAuthStore.getState().socket;
    
    if (!socket || !socket.connected) {
        console.log("Socket not connected");
        return;
    }

    // Remove existing listener to prevent duplicates
    socket.off("newMessage");

    socket.on("newMessage", (newMessage: any) => {
        console.log("📨 New message received:", newMessage);
        
        const { selectedUser: currentUser } = get();
        
        // Only add message if it belongs to current conversation
        const isRelevantMessage = 
            newMessage.senderId === currentUser?.followerId?._id || 
            newMessage.receiverId === currentUser?.followerId?._id;
        
        if (isRelevantMessage) {
            const currentMessages = get().conversation;
            set({ conversation: [...currentMessages, newMessage] })
        }
    })
},

unsubscribeFromMessages: () => {  // Fixed typo here
    const socket = UseAuthStore.getState().socket;
    if (socket) {
        socket.off("newMessage")
    }
}
})) 