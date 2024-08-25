import { useCallback } from 'react';
import { getLocales } from 'expo-localization';
import { I18n, TranslateOptions } from 'i18n-js';

import { en } from '@app/lang';

const i18n = new I18n({
  en,
});

const useTranslation = () => {
  i18n.locale = getLocales()[0]?.languageCode ?? 'en';

  const t = useCallback(
    (key: string, scope: string, options?: TranslateOptions) =>
      i18n.t(key, {
        scope,
        ...options,
      }),
    [],
  );

  return {
    t,
  };
};

export default useTranslation;
