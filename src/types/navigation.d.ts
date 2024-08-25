import { PAGES } from "@app/constants";

type RootStackParamList = {
  //* Bottom Tab's
  [PAGES.PROFILE]: undefined;
  [PAGES.BOTTOM_TAB]: undefined;
  //* Stack Screen's
  [PAGES.HOME]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
