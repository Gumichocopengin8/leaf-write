import { useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import ReactToPrint from 'react-to-print';
import { css } from '@emotion/react';

const Home: NextPage = () => {
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
              <div css={PostalCodeLeft}>123</div>
              <div css={PostalCodeRight}>4567</div>
              <div css={Address1}>八王子市元本郷町3-24-1</div>
              <div css={Address2}>新築アパートメント３番館109</div>
              <div css={LastName}>佐藤</div>
              <div css={FirstName}>
                <div>
                  奈々恵
                  <span css={Suffix}>様</span>
                </div>
                <div>
                  奈々恵
                  <span css={Suffix}>様</span>
                </div>
              </div>
            </div>
            <div>
              <div css={FromAddress1}>八王子市元本郷町3-24-1</div>
              <div css={FromAddress2}>新築アパートメント３番館109</div>
              <div css={FromLastName}>鈴木</div>
              <div css={FromFirstName}>
                <div>かな</div>
                <div>かな</div>
              </div>
              <div css={FromPostalCodeLeft}>123</div>
              <div css={FromPostalCodeRight}>4567</div>
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
  transform: scale(0.8);
`;

const NengajoImage = css`
  height: 100%;
  border: 1px solid gray;
`;

const PostalCode = css`
  position: absolute;
  top: 9.5%;
  font-size: 3.5vh;
`;

const PostalCodeLeft = css`
  ${PostalCode};
  letter-spacing: 3.75vh;
  right: 32%;
`;

const PostalCodeRight = css`
  ${PostalCode};
  letter-spacing: 3vh;
  right: 6%;
`;

const Address = css`
  position: absolute;
  top: 17%;
  font-size: 3.25vh;
  writing-mode: vertical-rl;
`;

const Address1 = css`
  ${Address};
  right: 10%;
`;

const Address2 = css`
  ${Address};
  right: 16%;
`;

const Name = css`
  position: absolute;
  right: 37%;
  writing-mode: vertical-rl;
  font-size: 4.5vh;
  font-weight: bold;
`;

const LastName = css`
  ${Name};
  top: 20%;
`;

const FirstName = css`
  ${Name};
  top: 50%;
`;

const Suffix = css`
  margin-top: 5vh;
`;

const FromAddressBase = css`
  position: absolute;
  top: 45%;
  font-size: 2.5vh;
  writing-mode: vertical-rl;
`;

const FromAddress1 = css`
  ${FromAddressBase};
  right: 65%;
`;

const FromAddress2 = css`
  ${FromAddressBase};
  right: 70%;
`;

const FromName = css`
  position: absolute;
  right: 77%;
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

export default Home;
