import 'dayjs/locale/zh-cn';

import { ConfigProvider, Spin, theme as antdTheme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { Suspense, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { HistoryRouter, history } from '@/shared/configs/routes/history';

import { LocaleFormatter, localeConfig } from '@/shared/locales';
import RenderRouter from '../shared/configs/routes';
import { setGlobalState } from '../stores/store/global.store';
import { AuthProvider } from '@/hooks';
import { AppState } from '@/stores';

type Props = {
  client: QueryClient;
};

const App = ({ client }: Props) => {
  const { locale } = useSelector((state: AppState) => state.user);
  const { theme, loading } = useSelector((state: AppState) => state.global);
  const dispatch = useDispatch();

  const setTheme = (dark = true) => {
    dispatch(
      setGlobalState({
        theme: dark ? 'dark' : 'light'
      })
    );
  };

  /** initial theme */
  useEffect(() => {
    setTheme(theme === 'dark');

    // watch system theme change
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      const matchMode = (e: MediaQueryListEvent) => setTheme(e.matches);

      mql.addEventListener('change', matchMode);
    }
  }, []);

  useEffect(() => {
    if (locale === 'en_US') {
      dayjs.locale('en');
    } else if (locale === 'zh_CN') {
      dayjs.locale('zh-cn');
    }
  }, [locale]);

  const getAntdLocale = () => {
    if (locale === 'en_US') {
      return enUS;
    } else if (locale === 'zh_CN') {
      return zhCN;
    }
  };

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ConfigProvider
          locale={getAntdLocale()}
          componentSize="middle"
          theme={{
            token: { colorPrimary: '#13c2c2' },
            algorithm:
              theme === 'dark'
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm
          }}
        >
          <IntlProvider
            locale={locale.split('_')[0]}
            messages={localeConfig[locale]}
          >
            <HistoryRouter history={history as any}>
              <Suspense fallback={null}>
                <Spin
                  spinning={loading}
                  className="app-loading-wrapper"
                  style={{
                    backgroundColor:
                      theme === 'dark'
                        ? 'rgba(0, 0, 0, 0.44)'
                        : 'rgba(255, 255, 255, 0.44)'
                  }}
                  tip={<LocaleFormatter id="gloabal.tips.loading" />}
                ></Spin>
                <RenderRouter />
              </Suspense>
            </HistoryRouter>
          </IntlProvider>
        </ConfigProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
