import { css } from '@emotion/react';
import { HagakiData } from 'interfaces/hagaki';
import HagakiDislay from 'components/hagaki';
import { usePrint } from 'hooks/usePrint';

interface Props {
  hagakiInfo: HagakiData;
}

const HagakiWithPrint = ({ hagakiInfo }: Props) => {
  const { componentRef, onPrint } = usePrint();

  return (
    <>
      <button onClick={onPrint}>印刷</button>
      <div css={Container}>
        <HagakiDislay hagakiInfo={hagakiInfo} isPrintMode={false} componentRef={componentRef} />
      </div>
    </>
  );
};

const Container = css`
  transform: scale(calc(0.8));
`;

export default HagakiWithPrint;
