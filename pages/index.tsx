import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Typography, Button, Pagination, Stack } from '@mui/material';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { css } from '@emotion/react';
import HagakiDislay from 'components/hagaki';
import { usePrint } from 'hooks/usePrint';
import useBoundStore from 'state/store';

const Home: NextPage = () => {
  const hagakiData = useBoundStore((state) => state.hagakiData);
  const [page, setPage] = useState<number>(1);
  const [componentBatchPrintRef, onBatchPrint] = usePrint();
  const [componentSinglePrintRef, onSinglePrint, isPrintModeForSingle] = usePrint();
  const currentHagakiData = hagakiData[page];

  const onPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (hagakiData.length === 0) {
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
      <header css={Topbar}>
        <Typography variant="h6" component="div">
          プレビュー
        </Typography>
        <Stack spacing={2}>
          <Pagination
            count={hagakiData.length - 1} // skip first one cuz first one is MY address
            page={page}
            onChange={onPageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Stack>
        <div css={ButtonGroup}>
          <Button onClick={onSinglePrint} variant="outlined">
            印刷
          </Button>
          <Button onClick={onBatchPrint} variant="contained">
            一括印刷
          </Button>
        </div>
      </header>
      <div css={[Container, HagakiDislayContainer]}>
        <div ref={componentSinglePrintRef}>
          {hagakiData.length === 1 && (
            <div css={Container}>
              <Typography>差出人住所のデータしかありません。</Typography>
              <Typography>宛名住所データも少なくとも１つは追加しましょう</Typography>
            </div>
          )}
          {hagakiData.length > 1 && currentHagakiData && (
            <HagakiDislay hagakiInfo={currentHagakiData} isPrintMode={isPrintModeForSingle} />
          )}
        </div>
        <div style={{ display: 'none' }}>
          <div ref={componentBatchPrintRef}>
            {hagakiData.slice(1).map((d) => (
              <HagakiDislay key={d.id} hagakiInfo={d} isPrintMode={true} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Topbar = css`
  position: sticky;
  height: 2rem;
  padding: 1rem;
  top: 0;
  display: flex;
  justify-content: space-between;
  background-color: white;
  z-index: 10;
  box-shadow: 0 8px 0.5rem rgba(0, 0, 0, 0.1);
`;

const HagakiDislayContainer = css`
  transform: scale(calc(0.8));
`;

const ButtonGroup = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

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
