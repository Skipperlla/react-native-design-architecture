import React, { useEffect } from 'react';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Initializing } from '@app/components';
import { useControlAppVersion } from '@app/hooks';
import Navigation from '@app/navigation';

const queryClient = new QueryClient();
void SplashScreen.preventAutoHideAsync();

export default function App() {
  const { checkVersion } = useControlAppVersion();
  const [fontsLoaded] = useFonts({
    'Urbanist-Bold': require('@app/assets/fonts/Urbanist-Bold.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }
    void (async () => {
      await SplashScreen.hideAsync();
      checkVersion();
    })();
  }, [fontsLoaded, checkVersion]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={style.container}>
        <Initializing />
        <SafeAreaProvider>
          <PortalProvider>
            <BottomSheetModalProvider>
              <Navigation />
            </BottomSheetModalProvider>
          </PortalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
