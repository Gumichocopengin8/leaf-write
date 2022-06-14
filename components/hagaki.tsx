import { useRef, useContext } from 'react';
import Head from 'next/head';
import ReactToPrint from 'react-to-print';
import { css } from '@emotion/react';
import { HagakiData } from 'interfaces/hagaki';
import { AppContext } from 'state/context';

interface Props {
  hagakiInfo: HagakiData;
}

const HagakiDislay = ({ hagakiInfo }: Props) => {
  const { myInfoStore } = useContext(AppContext);
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>Nengajo Kit</title>
      </Head>
      <div>
        <ReactToPrint
          pageStyle="@page { size: 3.94in 5.83in }"
          trigger={() => <button>印刷</button>}
          content={() => componentRef.current}
        />
        <div css={WorkSpace}>
          <img css={NengajoImage} src="/hagaki.png" height="100%" alt="nengajo" />
          <div ref={componentRef}>
            <div>
              <div css={PostalCodeLeft}>{hagakiInfo.postalcode_left}</div>
              <div css={PostalCodeRight}>{hagakiInfo.postalcode_right}</div>
              <div css={Address1}>{hagakiInfo.address1}</div>
              <div css={Address2}>{hagakiInfo.address2}</div>
              <div css={Name}>
                <div>{hagakiInfo.lastName}</div>
                <div>
                  {hagakiInfo.firstNameSuffixList.map((d, index) => (
                    <div key={index} css={Suffix}>
                      <div>{d.firstName}</div>
                      <div>{d.suffix}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div css={FromAddress1}>{myInfoStore.myInfoData.address1}</div>
              <div css={FromAddress2}>{myInfoStore.myInfoData.address2}</div>
              <div css={FromLastName}>{myInfoStore.myInfoData.lastName}</div>
              <div css={FromFirstName}>
                <div>{myInfoStore.myInfoData.firstName1}</div>
                <div>{myInfoStore.myInfoData.firstName2}</div>
              </div>
              <div css={FromPostalCodeLeft}>{myInfoStore.myInfoData.postalcode_left}</div>
              <div css={FromPostalCodeRight}>{myInfoStore.myInfoData.postalcode_right}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const WorkSpace = css`
  position: relative;
  width: fit-content;
  height: fit-content;
  transform: scale(calc(0.8));
`;

const NengajoImage = css`
  height: 100vh;
  border: 1px solid gray;
`;

const PostalCode = css`
  position: absolute;
  top: 9.5%;
  font-size: 3.5vh;
`;

const PostalCodeLeft = css`
  ${PostalCode};
  letter-spacing: 3.5vh;
  right: 32%;
`;

const PostalCodeRight = css`
  ${PostalCode};
  letter-spacing: 3vh;
  right: 5%;
`;

const Address = css`
  position: absolute;
  top: 16%;
  height: 64vh;
  font-size: 3.25vh;
  writing-mode: vertical-rl;
`;

const Address1 = css`
  ${Address};
  right: 8%;
`;

const Address2 = css`
  ${Address};
  right: 15%;
  text-align: end;
  text-indent: 1cm;
`;

const Name = css`
  height: 60vh;
  position: absolute;
  top: calc(16% + 4vh);
  right: 36%;
  display: flex;
  justify-content: space-between;
  writing-mode: vertical-rl;
  font-size: 6vh;
  font-weight: bold;
`;

const Suffix = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5vh;
`;

const FromAddressBase = css`
  position: absolute;
  top: 45%;
  font-size: 2.5vh;
  writing-mode: vertical-rl;
`;

const FromAddress1 = css`
  ${FromAddressBase};
  right: 68%;
`;

const FromAddress2 = css`
  ${FromAddressBase};
  right: 72%;
`;

const FromName = css`
  position: absolute;
  right: 78%;
  font-size: 3.5vh;
  writing-mode: vertical-rl;
`;

const FromLastName = css`
  ${FromName};
  top: 48%;
`;

const FromFirstName = css`
  ${FromName};
  top: 68%;
`;

const FromPostalCode = css`
  position: absolute;
  bottom: 14%;
  font-size: 2.5vh;
  letter-spacing: 1.5vh;
`;

const FromPostalCodeLeft = css`
  ${FromPostalCode};
  left: 7%;
`;

const FromPostalCodeRight = css`
  ${FromPostalCode};
  left: 20%;
`;

export default HagakiDislay;
