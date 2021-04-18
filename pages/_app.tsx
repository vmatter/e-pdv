import { ReactNode, useEffect } from 'react';
import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { ThemedApp } from '../styles';

export const cache = createCache({ key: 'css', prepend: true });

function MyApp({ Component, pageProps }: AppProps): ReactNode {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <ThemedApp>
        <Component {...pageProps} />
      </ThemedApp>
    </CacheProvider>
  );
}

export default MyApp;
