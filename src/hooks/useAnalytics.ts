import { useCallback } from 'react';
import * as amplitude from '@amplitude/analytics-react-native';

export default function useAnalytics(screenName: string) {
  const logEvent = useCallback(
    (
      elementName: string,
      action: string,
      elementType: string,
      options?: Object,
    ) => {
      const events = {
        screen: screenName,
        element: elementName,
        action: action,
        type: elementType,
        options,
      };
      amplitude.logEvent(screenName, events);
    },
    [],
  );

  return logEvent;
}
