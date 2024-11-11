import { Appearance, ColorSchemeName } from 'react-native';
import { getLocales } from 'expo-localization';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import mmkvStorage from './mmkv';

type State = {
  isDarkMode: boolean;
  defaultTheme: ColorSchemeName;
  defaultLanguage: string;
};
type Actions = {
  setTheme: (theme: ColorSchemeName) => void;
  setLanguage: (language: string) => void;
};

const useAppStore = create<State & Actions>()(
  persist(
    (set) => ({
      isDarkMode: Appearance.getColorScheme() === 'dark',
      defaultTheme: Appearance.getColorScheme(),
      defaultLanguage: getLocales()[0]?.languageCode ?? 'en',

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
      name: 'app-store',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);

export default useAppStore;
