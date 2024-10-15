import { useEffect } from 'react';
import { Appearance } from 'react-native';
import * as amplitude from '@amplitude/analytics-react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { useColorScheme } from 'nativewind';

import { useAppStore } from '@app/store';
import { AMPLITUDE_API_KEY } from '@env';

//* Disable Crashlytics data collection in development mode
void crashlytics().setCrashlyticsCollectionEnabled(!__DEV__);
//TODO: CHANGE THIS
amplitude.init(AMPLITUDE_API_KEY);

const Initializing = () => {
  const { setTheme } = useAppStore();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    void crashlytics().setUserId(
      'if the user has a unique ID, enter it in this field',
    );
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!colorScheme) {
        return;
      }
      setTheme(colorScheme);
      setColorScheme(colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
};

export default Initializing;
