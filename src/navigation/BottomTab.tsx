import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PAGES } from "@app/constants";
import { Home } from "@app/screens";
import type { RootStackParamList } from "@app/types/navigation";

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={PAGES.HOME} component={Home} />
    </Tab.Navigator>
  );
};

export default BottomTab;
