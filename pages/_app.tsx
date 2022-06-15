import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { css } from '@emotion/react';
import { AppProvider } from 'state/context';
import NavBar from 'components/common/navbar';
import MainLayout from 'components/layout/mainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div css={Wrapper}>
        <>
          <Head>
            <title>リーフライト</title>
            <meta name="description" content="リーフライト" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div css={GridContainer}>
            <nav css={TabNavContainer}>
              <NavBar />
              <Divider orientation="vertical" />
            </nav>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </div>
        </>
      </div>
    </AppProvider>
  );
}

const Wrapper = css`
  min-width: 100%;
  min-height: 100%;
  padding: 0;
  margin: 0;
  overflow-y: hidden;
`;

const GridContainer = css`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-columns: auto 1fr;
  grid-template-areas: 'nav content' 'nav content';
  box-sizing: border-box;
`;

const TabNavContainer = css`
  grid-area: nav;
  padding: 1rem 0;
  display: flex;
  gap: 0.5rem;
`;

export default MyApp;
