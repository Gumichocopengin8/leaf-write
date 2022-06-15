import { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { css } from '@emotion/react';
import HagakiDislay from 'components/hagaki';
import { AppContext } from 'state/context';

const Home: NextPage = () => {
  const { hagakiStore } = useContext(AppContext);

  if (hagakiStore.hagakiData.length === 0) {
    return (
      <div css={Container}>
        <Typography variant="h4" gutterBottom>
          ようこそ、リーフライト
          <EnergySavingsLeafIcon fontSize="large" color="success" />へ
        </Typography>
        <Typography>年賀状ハガキの住所をウェブで簡単に作成、プリントすることができます</Typography>
        <Link css={HyperLink} href="/tutorial">
          <Button>チュートリアルを見る</Button>
        </Link>
        <Link css={HyperLink} href="/addressbook">
          <Button>はじめる</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Nengajo Kit</title>
      </Head>
      {hagakiStore.hagakiData.map((d) => (
        <HagakiDislay key={d.id} hagakiInfo={d} />
      ))}
    </>
  );
};

const Container = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HyperLink = css`
  text-decoration: none;
`;

export default Home;
