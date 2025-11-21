import { AxiosInstance } from '@/lib/axios.js';
import { create } from 'zustand'
import toast from "react-hot-toast"

interface AuthState {
    authUser: any;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    checkAuth: () => Promise<void>;
    signup: (data: UserData) => Promise<void>;
}

interface UserData {
    fullname: string;
    gender: string;
    email: string;
    password: string;
}

export const UseAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    checkAuth: async () => {
        try {
            const res = await AxiosInstance.get("/auth/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in check Auth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data: UserData) => {
        set({ isSigningUp: true })
        try {
            const res = await AxiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account created successfully")
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isSigningUp: false })
        }
    }
}));