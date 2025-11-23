import { AxiosInstance } from '@/lib/axios.js';
import { create } from 'zustand'
import toast from "react-hot-toast"

interface AuthState {
    auth: any;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    checkAuth: () => Promise<void>;
    signup: (data: SignUpData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
}

interface SignUpData {
    fullname: string;
    gender: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const UseAuthStore = create<AuthState>((set) => ({
    auth: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await AxiosInstance.get("/auth/check")
            set({ auth: res.data })
        } catch (error) {
            console.log("Error in check Auth", error)
            set({ auth: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data: SignUpData) => {
        set({ isSigningUp: true })

        try {
            const res = await AxiosInstance.post("/auth/signup", data)
            set({ auth: res.data })
            toast.success("Account created successfully")
        } catch (error: any) {
            set({ auth: null })
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data: LoginData) => {
        set({ isLoggingIn: true })

        try {
            const res = await AxiosInstance.post("/auth/login", data)
            set({ auth: res.data })
            toast.success("Logged in successfully")
        } catch (error: any) {
            set({ auth: null })
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await AxiosInstance.post("/auth/logout")
            set({ auth: null })
            toast.success("Logout successfuly")
        } catch (error: any) {
            console.log("Logout error", error)
            toast.error("Something went wrong")
        }
    }
}));