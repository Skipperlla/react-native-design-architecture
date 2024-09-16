import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import FastImage, {
  FastImageProps,
  Priority,
  ResizeMode,
} from 'react-native-fast-image';

import { rs } from '@app/utils';

import Icon from './IcoMoon';

type Props = {
  uri?: string;
  priority?: Priority;
  resizeMode?: ResizeMode;
} & FastImageProps;

const _FastImage = ({
  uri,
  resizeMode = 'cover',
  priority = FastImage.priority.normal,
  ...rest
}: Props) => {
  const [onLoad, setOnLoad] = useState<boolean>(true);
  const onLoadStart = useCallback(() => setOnLoad(true), []);
  const onLoadEnd = useCallback(() => setOnLoad(false), []);

  if (!uri)
    return (
      <View className="w-full h-full justify-center items-center">
        {/* //TODO: Change this color */}
        <Icon icon="image_outline" size={rs(26)} color="#FFA800" />
      </View>
    );

  return (
    <FastImage
      source={{
        uri,
        priority,
      }}
      onLoadEnd={onLoadEnd}
      onLoadStart={onLoadStart}
      resizeMode={resizeMode}
      {...rest}
    >
      {onLoad && <ActivityIndicator size="small" color="#FFA800" />}
    </FastImage>
  );
};

export default _FastImage;
