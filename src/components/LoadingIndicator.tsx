import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

import { useAppStore } from '@app/store';

type Props = {
  color?: string;
  size?: number | 'small' | 'large';
};

const _LoadingIndicator = ({ color, size = 'small' }: Props) => {
  const { isDarkMode } = useAppStore();

  return (
    <ActivityIndicator
      size={size}
      color={color ? color : isDarkMode ? 'white' : 'black'}
    />
  );
};

export default memo(_LoadingIndicator);
