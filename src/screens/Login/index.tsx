import React from 'react';
import { View, Text } from 'react-native';

import { api, useTranslation } from '@app/hooks';

const SCOPE = 'screens.Login';

const Login = () => {
  const { t } = useTranslation();
  const { data } = api.useGetPrediction('1');
  console.log(data);

  return (
    <View>
      <Text>{t('labels.helloWorld', SCOPE)}</Text>
    </View>
  );
};

export default Login;
