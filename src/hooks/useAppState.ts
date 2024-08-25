import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type Settings = {
  onChange?: (state: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
};

export default function useAppState(settings: Settings = {}) {
  const { onChange, onForeground, onBackground } = settings;
  const [appStateStatus, setAppStateStatus] = useState<AppStateStatus>(
    AppState.currentState,
  );

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (nextAppState === 'active' && appStateStatus !== 'active') {
        onForeground?.();
      } else if (
        appStateStatus === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        onBackground?.();
      }
      setAppStateStatus(nextAppState);
      onChange?.(nextAppState);
    }
    const appState = AppState.addEventListener('change', handleAppStateChange);

    return () => appState.remove();
  }, [onChange, onForeground, onBackground, appStateStatus]);

  return { appState: appStateStatus };
}
