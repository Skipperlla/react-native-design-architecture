import { useEffect, useState } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';

const useRemoteConfig = (configKey: string) => {
  const [remoteConfigValue, setRemoteConfigValue] = useState('');

  useEffect(() => {
    void (async () => {
      await remoteConfig().fetchAndActivate();
      const features = remoteConfig().getAll();

      let featuresObject = {} as Record<string, string>;
      Object.entries(features)?.map(([key, value]) => {
        featuresObject = { ...featuresObject, [key]: value.asString() };
      });
      if (Object.prototype.hasOwnProperty.call(featuresObject, configKey)) {
        setRemoteConfigValue(featuresObject[configKey] as string);
      }
    })();
  }, []);

  return remoteConfigValue;
};

export default useRemoteConfig;
