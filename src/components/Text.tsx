import React, { memo, useMemo } from 'react';
import { Text, TextProps } from 'react-native';
import cn from 'classnames';
import { TranslateOptions } from 'i18n-js';

import { useTranslation } from '@app/hooks';

type Props = {
  translation?: {
    key: string;
    scope?: string;
    options?: TranslateOptions;
  };
  fontFamily: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
} & TextProps;

const _Text = ({ translation, ...rest }: Props) => {
  const { t } = useTranslation();

  //TODO: CHANGE THIS OWN FONT FAMILY
  const getFontFamily = useMemo(() => {
    switch (rest.fontFamily) {
      case 'light':
        return 'font-urbanistLight';
      case 'regular':
        return 'font-urbanistRegular';
      case 'medium':
        return 'font-urbanistMedium';
      case 'semibold':
        return 'font-urbanistSemiBold';
      case 'bold':
        return 'font-urbanistBold';
      default:
        return 'Urbanist-Regular';
    }
  }, []);

  return (
    <Text className={cn(rest.className, getFontFamily)} {...rest}>
      {translation?.scope
        ? t(translation?.key, translation?.scope, translation?.options)
        : translation?.key}
    </Text>
  );
};

export default memo(_Text);
