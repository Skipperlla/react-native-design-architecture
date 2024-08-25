import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const usePhoneDeviceControl = () => {
  const { bottom } = useSafeAreaInsets();

  return {
    isDeviceSE: Platform.OS === 'ios' && bottom === 0,
    isXAbove: Platform.OS === 'ios' && bottom > 0,
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
  };
};

export default usePhoneDeviceControl;
