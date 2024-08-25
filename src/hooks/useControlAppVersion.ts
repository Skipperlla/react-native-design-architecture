import { Alert, Linking, Platform } from 'react-native';
import * as Application from 'expo-application';
import semver from 'semver';

import { REMOTE_CONFIG_KEYS } from '@app/constants';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@env';

import useRemoteConfig from './useRemoteConfig';
import useTranslation from './useTranslation';

const SCOPE = 'hooks.useControlAppVersion';

const useControlAppVersion = () => {
  const STORE_URL = Platform.select({
    ios: APP_STORE_URL,
    android: GOOGLE_PLAY_URL,
  });
  const { t } = useTranslation();
  const minAppVersion = useRemoteConfig(REMOTE_CONFIG_KEYS.MIN_APP_VERSION);

  function checkVersion() {
    const version = Application.nativeApplicationVersion;
    const handledDeviceVersion = semver.coerce(version)?.version;
    const handledMinAppVersion = semver.coerce(
      minAppVersion as string,
    )?.version;

    const updateNeeded =
      handledDeviceVersion &&
      handledMinAppVersion &&
      !semver.gte(handledDeviceVersion, handledMinAppVersion);

    if (updateNeeded) {
      Alert.alert(
        t('labels.title', SCOPE),
        t('labels.description', SCOPE, {
          name: Application.applicationName,
        }),
        [
          {
            text: t('actions.update', SCOPE),
            onPress: () => Linking.openURL(STORE_URL as string),
          },
        ],
      );
    }
  }

  return {
    checkVersion,
  };
};

export default useControlAppVersion;
