import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import mmkvStorage from "./mmkv";

type UserType = {
  id: string;
};

type State = {
  isLoggedIn: boolean;
  user: UserType;
};
type Actions = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: UserType) => void;
  removeUser: () => void;
};

const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      //* State
      isLoggedIn: false,
      user: {} as UserType,
      // * Actions
      setIsLoggedIn: (isLoggedIn) => set((state) => ({ ...state, isLoggedIn })),
      setUser: (user) => set((state) => ({ ...state, user })),
      removeUser: () =>
        set((state) => ({ ...state, user: {} as UserType, isLoggedIn: false })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useAuthStore;
