import { AuthStoreActionsType, AuthStoreStateType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create<AuthStoreStateType & AuthStoreActionsType>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      hasHydrated: false,

      login: async (email: string, _password: string) => {
        set({ isAuthenticated: true, user: { id: crypto.randomUUID(), email } });
      },

      register: async (name: string, email: string, _password: string) => {
        set({ isAuthenticated: true, user: { id: crypto.randomUUID(), email, name } });
      },

      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useAuthStore;




