import { AuthStoreActionsType, AuthStoreStateType, AuthUser } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStoreWithUsers = AuthStoreStateType & AuthStoreActionsType & {
  users: AuthUser[];
  addUser: (user: AuthUser) => void;
  getUserByEmail: (email: string) => AuthUser | undefined;
};

const useAuthStore = create<AuthStoreWithUsers>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      hasHydrated: false,
      users: [],

      addUser: (user: AuthUser) => {
        set((state) => {
          const existingUserIndex = state.users.findIndex(u => u.email === user.email);
          if (existingUserIndex !== -1) {
            // Update existing user
            const updatedUsers = [...state.users];
            updatedUsers[existingUserIndex] = user;
            return { users: updatedUsers };
          } else {
            // Add new user
            return { users: [...state.users, user] };
          }
        });
      },

      getUserByEmail: (email: string) => {
        const { users } = get();
        return users.find(u => u.email === email);
      },

      login: async (email: string, password: string) => {
        const state = get();
        console.log('Login attempt for email:', email);
        
        // Check if user exists in our users list
        const existingUser = state.getUserByEmail(email);
        
        if (existingUser && existingUser.name) {
          // Check if password matches (for demo purposes)
          if (existingUser.password && existingUser.password !== password) {
            console.log('Password mismatch for user:', email);
            throw new Error('Invalid email or password');
          }
          console.log('User exists, logging in:', existingUser);
          set({ isAuthenticated: true, user: existingUser });
          return;
        }
        
        // Check if we have any stored user data in localStorage
        const storedData = localStorage.getItem('auth-storage');
        if (storedData) {
          try {
            const parsed = JSON.parse(storedData);
            if (parsed.state && parsed.state.user && parsed.state.user.email === email && parsed.state.user.name) {
              const storedUser = parsed.state.user;
              // Check if password matches stored user
              if (storedUser.password && storedUser.password !== password) {
                console.log('Password mismatch for stored user:', email);
                throw new Error('Invalid email or password');
              }
              console.log('Found stored user, logging in:', storedUser);
              set({ isAuthenticated: true, user: storedUser });
              // Add to users list for future use
              state.addUser(storedUser);
              return;
            }
          } catch (e) {
            console.log('Error parsing localStorage:', e);
          }
        }
        
        // If we reach here, no valid user was found
        console.log('No valid user found for email:', email);
        throw new Error('Invalid email or password');
      },

      register: async (name: string, email: string, password: string) => {
        console.log('Registering user:', { name, email });
        const newUser = { id: email, email, name, password }; // Store password for demo
        set({ isAuthenticated: true, user: newUser });
        // Add to users list
        get().addUser(newUser);
        console.log('User registered and added to users list');
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
