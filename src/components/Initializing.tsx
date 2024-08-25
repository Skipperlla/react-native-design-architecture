import { useEffect } from "react";
import crashlytics from "@react-native-firebase/crashlytics";

//* Disable Crashlytics data collection in development mode
crashlytics().setCrashlyticsCollectionEnabled(!__DEV__);

const Initializing = () => {
  useEffect(() => {
    crashlytics().setUserId(
      "if the user has a unique ID, enter it in this field"
    );
  }, []);

  return null;
};

export default Initializing;
