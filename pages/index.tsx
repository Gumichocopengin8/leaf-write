import { useContext } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { css } from '@emotion/react';
import HagakiDislay from 'components/hagaki';
import HagakiWithPrint from 'components/hagakiWithPrint';
import { usePrint } from 'hooks/usePrint';
import { AppContext } from 'state/context';

const Home: NextPage = () => {
  const { hagakiStore } = useContext(AppContext);
  const { componentRef, onPrint } = usePrint();

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
      <button onClick={onPrint}>一括印刷</button>
      <div ref={componentRef}>
        {hagakiStore.hagakiData.map((d) => (
          <HagakiWithPrint key={d.id} hagakiInfo={d} />
        ))}
      </div>
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          {hagakiStore.hagakiData.map((d) => (
            <HagakiDislay key={d.id} hagakiInfo={d} isPrintMode={true} />
          ))}
        </div>
      </div>
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
