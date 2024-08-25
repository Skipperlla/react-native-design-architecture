import React, { useRef } from "react";
import analytics from "@react-native-firebase/analytics";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PAGES } from "@app/constants";
import { navigationRef } from "@app/hooks/useAppNavigation";
import { Home } from "@app/screens";
import type { RootStackParamList } from "@app/types/navigation";
import { useAuthStore } from "@app/store";

import BottomTab from "./BottomTab";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const routeNameRef = useRef<string>();
  const { isLoggedIn } = useAuthStore();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  const initialRouteName = isLoggedIn ? PAGES.BOTTOM_TAB : PAGES.HOME;

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyTheme}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen name={PAGES.BOTTOM_TAB} component={BottomTab} />
        ) : (
          <Stack.Group>
            <Stack.Screen name={PAGES.HOME} component={Home} />
            {/* //* Other Screens */}
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
