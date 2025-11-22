import { AxiosInstance } from "@/lib/axios"
import { create } from "zustand"

interface UserState {
    userList: [];
    usersCount: number;
    users: () => Promise<void>;
}


export const UseUserStore = create<UserState>((set) => ({
    userList: [],
    usersCount: 0,

    users: async () => {
        try {
            const res = await AxiosInstance.get("/user/users")
            set({
                userList: res.data.filteredUsers,
                usersCount: res.data.usersCount
            })
        } catch (error) {

        }
    }
}))