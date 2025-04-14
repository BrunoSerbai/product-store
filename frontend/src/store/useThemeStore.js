import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: 'dark',
  setTheme: (newTheme) => set({ theme: newTheme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }))
}))