import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import {theme} from "dh-marvel/styles/material-theme";

import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<T> = NextPage<T>  & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<unknown> 
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {getLayout(<Component {...pageProps} />)}
    <style jsx global>{`
              /* Other global styles such as 'html, body' etc... */

              #__next {
                height: 100%;
              }
            `}</style>
  </ThemeProvider>
}

export default MyApp
