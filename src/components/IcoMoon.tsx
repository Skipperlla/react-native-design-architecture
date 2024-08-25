import React, { memo } from 'react';
import IcoMoon, { IconProps } from 'react-icomoon';
import { Svg, Path } from 'react-native-svg';

import iconSet from '@app/assets/icons.json';

type Props = Omit<IconProps, 'iconSet' | 'SvgComponent' | 'PathComponent'>;

const _Icon = ({ ...props }: Props) => {
  return (
    <IcoMoon
      native
      iconSet={iconSet}
      SvgComponent={Svg}
      PathComponent={Path}
      {...props}
    />
  );
};

export default memo(_Icon);
