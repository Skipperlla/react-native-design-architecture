import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { api, useTranslation } from '@app/hooks';

const SCOPE = 'screens.Login';

const Login = () => {
  const { t } = useTranslation();
  const { data } = api.useGetPrediction('1');
  console.log(data);

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        accessibilityRole="button"
        testID="Test Button"
        onPress={() => {
          Alert.alert('Hello World');
        }}
      >
        <Text>{t('labels.helloWorld', SCOPE)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
