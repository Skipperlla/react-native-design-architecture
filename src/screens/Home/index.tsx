import React from 'react';
import { View, Text } from 'react-native';

import { api } from '@app/hooks';

const Home = () => {
  const { mutate } = api.useCreatePrediction({});

  return (
    <View>
      <Text
        onPress={() => {
          mutate({});
        }}
      >
        Home
      </Text>
    </View>
  );
};

export default Home;
