import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';

import { useAppStore } from '@app/store';

const Home = () => {
  const { setTheme, isDarkMode } = useAppStore();
  const { toggleColorScheme, colorScheme } = useColorScheme();
  // const { mutate } = api.useCreatePrediction({});

  return (
    <View className="flex-1 items-center justify-center bg-slate-200 dark:bg-slate-900">
      <TouchableOpacity
        accessibilityRole="button"
        testID="Test Button"
        onPress={() => {
          setTheme(isDarkMode ? 'light' : 'dark');

          toggleColorScheme();
        }}
      >
        <Text className="text-red-500 dark:text-white">
          {`Try clicking me! ${colorScheme === 'dark' ? '🌙' : '🌞'}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
