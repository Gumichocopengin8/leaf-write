import type { NextPage } from 'next';
import Head from 'next/head';
import { css } from '@emotion/react';
import HagakiDislay from '../components/hagaki';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nengajo Kit</title>
      </Head>
      <HagakiDislay />
    </>
  );
};

export default Home;
