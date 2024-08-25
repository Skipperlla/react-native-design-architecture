import * as Notifications from "expo-notifications";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import mmkvStorage from "./mmkv";

type State = {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
};
type Actions = {
  setExpoPushToken: (expoPushToken: Notifications.ExpoPushToken) => void;
  setNotification: (notification: Notifications.Notification) => void;
};

const useNotificationStore = create<State & Actions>()(
  persist(
    (set) => ({
      expoPushToken: undefined,
      notification: undefined,
      setExpoPushToken: (expoPushToken: Notifications.ExpoPushToken) =>
        set((state) => {
          return { ...state, expoPushToken };
        }),
      setNotification: (notification: Notifications.Notification) =>
        set((state) => {
          return { ...state, notification };
        }),
    }),
    {
      name: "notification",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useNotificationStore;
