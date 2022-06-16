import { useContext, RefObject } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HagakiData } from 'interfaces/hagaki';
import { AppContext } from 'state/context';

interface Props {
  hagakiInfo: HagakiData;
  isPrintMode: boolean;
  componentRef?: RefObject<HTMLDivElement>;
}

const HagakiDislay = ({ hagakiInfo, isPrintMode, componentRef }: Props) => {
  const { myInfoStore } = useContext(AppContext);

  const numberOfFirstNames = () => hagakiInfo.firstNameSuffixList.filter((d) => d.firstName).length;

  return (
    <>
      <WorkSpace isPrintMode={isPrintMode}>
        <NengajoImage isPrintMode={isPrintMode} src="/nengajo.png" loading="lazy" alt="nengajo" />
        <div ref={componentRef}>
          <div>
            <div css={PostalCodeLeft}>{hagakiInfo.postalcode_left}</div>
            <div css={PostalCodeRight}>{hagakiInfo.postalcode_right}</div>
            <div css={Address1}>{hagakiInfo.address1}</div>
            <div css={Address2}>{hagakiInfo.address2}</div>
            <Name size={numberOfFirstNames()}>
              <div>{hagakiInfo.lastName}</div>
              <div>
                {hagakiInfo.firstNameSuffixList.map((d, index) => (
                  <div key={index} css={Suffix}>
                    <div>{d.firstName}</div>
                    <div>{d.suffix}</div>
                  </div>
                ))}
              </div>
            </Name>
          </div>
          <div>
            <div css={FromAddress1}>{myInfoStore.myInfoData.address1}</div>
            <div css={FromAddress2}>{myInfoStore.myInfoData.address2}</div>
            <div css={FromName}>
              <div>{myInfoStore.myInfoData.lastName}</div>
              <div css={FromFirstName}>
                <div>{myInfoStore.myInfoData.firstName1}</div>
                <div>{myInfoStore.myInfoData.firstName2}</div>
              </div>
            </div>
            <div css={FromPostalCodeLeft}>{myInfoStore.myInfoData.postalcode_left}</div>
            <div css={FromPostalCodeRight}>{myInfoStore.myInfoData.postalcode_right}</div>
          </div>
        </div>
      </WorkSpace>
    </>
  );
};

const WorkSpace = styled.div<{ isPrintMode: boolean }>`
  position: relative;
  width: fit-content;
  height: 100vh;
  border: ${(props) => (props.isPrintMode ? '0px' : '1px solid gray')};
`;

const NengajoImage = styled.img<{ isPrintMode: boolean }>`
  height: 100%;
  visibility: ${(props) => (props.isPrintMode ? 'hidden' : 'visible')};
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
  font-weight: bold;
  writing-mode: vertical-rl;
`;

const Address1 = css`
  ${Address};
  right: 8%;
`;

const Address2 = css`
  ${Address};
  right: 14%;
  text-align: end;
  text-indent: 1cm;
`;

const Name = styled.div<{ size: number }>`
  height: 60vh;
  position: absolute;
  top: calc(16% + 4vh);
  right: calc(45% - ${(props) => props.size} * 6.25%);
  display: flex;
  justify-content: space-around;
  writing-mode: vertical-rl;
  font-size: calc(8vh - ${(props) => props.size} * 0.75vh);
  font-weight: bolder;
`;

const Suffix = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5vh;
`;

const FromAddressBase = css`
  position: absolute;
  bottom: 20%;
  font-size: 2.5vh;
  font-weight: bold;
  writing-mode: vertical-rl;
`;

const FromAddress1 = css`
  ${FromAddressBase};
  left: 28%;
`;

const FromAddress2 = css`
  ${FromAddressBase};
  left: 22.5%;
`;

const FromName = css`
  position: absolute;
  right: 79%;
  bottom: 20%;
  display: flex;
  gap: 1em;
  font-size: 4.25vh;
  writing-mode: vertical-rl;
  font-weight: bold;
`;

const FromFirstName = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
