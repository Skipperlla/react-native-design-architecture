import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const storage = new MMKV();

const mmkvStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

export default mmkvStorage;
