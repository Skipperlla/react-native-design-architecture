import React from 'react';
import { View, Text } from 'react-native';

import { useTranslation } from '@app/hooks';

const SCOPE = 'screens.Login';

const Login = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t('labels.helloWorld', SCOPE)}</Text>
    </View>
  );
};

export default Login;
