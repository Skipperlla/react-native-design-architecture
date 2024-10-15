import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, RouteProp } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

import { PAGES } from '@app/constants';

type RootStackParamList = {
  //* Bottom Tab's
  [PAGES.PROFILE]: undefined;
  [PAGES.BOTTOM_TAB]: undefined;
  //* Stack Screen's
  [PAGES.HOME]: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

type HomeTabScreenProps<T extends keyof RootStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
