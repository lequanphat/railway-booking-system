import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (payload) => set({ user: payload, isAuthenticated: true }),
}));

export default useAuthStore;
