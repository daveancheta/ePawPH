import { AxiosInstance } from "@/lib/axios"
import { create } from "zustand"

interface UserState {
    userList: [];
    users: () => Promise<void>;
}


export const UseUserStore = create<UserState>((set) => ({
    userList: [],

    users: async () => {
        try {
            const res = await AxiosInstance.get("/user/users")
            set({ userList: res.data })
        } catch (error) {

        }
    }
}))