import { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { css } from '@emotion/react';
import HagakiDislay from 'components/hagaki';
import CSVReader from 'components/common/CSVReader';
import { AppContext } from 'state/context';

const Home: NextPage = () => {
  const { hagakiStore } = useContext(AppContext);

  return (
    <>
      <Head>
        <title>Nengajo Kit</title>
      </Head>
      <CSVReader />
      {hagakiStore.hagakiData.map((d) => (
        <HagakiDislay key={d.id} hagakiInfo={d} />
      ))}
    </>
  );
};

export default Home;
