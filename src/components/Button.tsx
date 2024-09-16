import React, { PropsWithChildren, memo } from 'react';
import { TouchableOpacity } from 'react-native';

import LoadingIndicator from './LoadingIndicator';

type Props = PropsWithChildren<
  {
    isLoading?: boolean;
    loadingIndicatorColor?: string;
  } & TouchableOpacity['props']
>;

const _Button = ({
  children,
  isLoading,
  loadingIndicatorColor,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity
      {...rest}
      className={`${rest.disabled ? 'opacity-50' : 'opacity-100'}`}
    >
      {isLoading ? (
        <LoadingIndicator color={loadingIndicatorColor} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default memo(_Button);
