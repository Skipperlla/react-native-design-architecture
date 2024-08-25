import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import mmkvStorage from "./mmkv";

type State = {
  isLoggedIn: boolean;
};
type Actions = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      //* State
      isLoggedIn: false,
      // * Actions
      setIsLoggedIn: (isLoggedIn) => set((state) => ({ ...state, isLoggedIn })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useAuthStore;
