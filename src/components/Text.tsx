import React, { memo } from 'react';
import { Text, TextProps } from 'react-native';
import { TranslateOptions } from 'i18n-js';

import { useTranslation } from '@app/hooks';

type Props = {
  translation?: {
    key: string;
    scope?: string;
    options?: TranslateOptions;
  };
} & TextProps;

const _Text = ({ translation, ...rest }: Props) => {
  const { t } = useTranslation();

  return (
    <Text {...rest}>
      {translation?.scope
        ? t(translation?.key, translation?.scope, translation?.options)
        : translation?.key}
    </Text>
  );
};

export default memo(_Text);
