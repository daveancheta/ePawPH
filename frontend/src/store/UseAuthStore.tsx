import { create } from 'zustand'

export const UseAuthStore = create(() => ({
    authUser: null,
}));