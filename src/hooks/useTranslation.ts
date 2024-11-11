import { useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import { I18n, TranslateOptions } from 'i18n-js';

import { en } from '@app/lang';
import { useAppStore } from '@app/store';

const AVAILABLE_LANGUAGES = ['en'];
const i18n = new I18n({
  en,
});

const useTranslation = () => {
  const { defaultLanguage, setLanguage } = useAppStore();
  const currentLanguage = AVAILABLE_LANGUAGES.includes(defaultLanguage)
    ? defaultLanguage
    : 'en';

  useEffect(() => {
    i18n.locale = currentLanguage;
    i18n.enableFallback = true;
    i18n.defaultLocale = currentLanguage;
    dayjs.locale(currentLanguage);
    setLanguage(currentLanguage);
  }, [currentLanguage]);

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
