import { Appearance, ColorSchemeName } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import mmkvStorage from './mmkv';

export interface AppState {
  isDarkMode: boolean;
  defaultTheme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
  setLanguage: (language: string) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: Appearance.getColorScheme() === 'dark',
      defaultTheme: Appearance.getColorScheme(),

      setTheme: (theme: ColorSchemeName) =>
        set((state) => {
          return {
            ...state,
            isDarkMode: theme === 'dark',
            defaultTheme: theme,
          };
        }),
      setLanguage: (language: string) =>
        set((state) => {
          return {
            ...state,
            defaultLanguage: language,
          };
        }),
    }),
    {
      name: 'app',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);

export default useAppStore;
