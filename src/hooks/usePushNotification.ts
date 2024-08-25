import { useEffect, useRef } from "react";
import { Alert, Linking } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { useNotificationStore } from "@app/store";

import usePhoneDeviceControl from "./usePhoneDeviceControl";
import useTranslation from "./useTranslation";

const SCOPE = "hooks.usePushNotification";

const usePushNotification = () => {
  const { setExpoPushToken, setNotification } = useNotificationStore();
  const { isAndroid } = usePhoneDeviceControl();
  const { t } = useTranslation();
  Notifications.setNotificationHandler({
    // eslint-disable-next-line require-await
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(t("labels.title", SCOPE), t("labels.description", SCOPE), [
          {
            text: t("actions.deny", SCOPE),
            style: "destructive",
          },
          {
            text: t("actions.allow", SCOPE),
            onPress: () => {
              void Linking.openSettings();
            },
          },
        ]);
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
      setExpoPushToken(token);
      console.log("ExpoPushToken", token);
    } else {
      console.error("Must use physical device for Push Notifications");
    }

    if (isAndroid) {
      void Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return;
  }

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notificationListener) => {
        setNotification(notificationListener);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return { registerForPushNotificationsAsync };
};

export default usePushNotification;
