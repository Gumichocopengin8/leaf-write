import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { HagakiData } from 'interfaces/hagaki';
import useBoundStore from 'state/store';

interface Props {
  hagakiInfo: HagakiData;
  isPrintMode: boolean;
}

const HagakiDislay = ({ hagakiInfo, isPrintMode }: Props) => {
  const hagakiData = useBoundStore((state) => state.hagakiData);

  const numberOfFirstNames = () => hagakiInfo.firstNameSuffixList.filter((d) => d.firstName).length;

  return (
    <WorkSpace isPrintMode={isPrintMode}>
      <NengajoImage isPrintMode={isPrintMode} src='/nengajo.png' loading='lazy' alt='nengajo' />
      <div>
        <PostalCodeLeft isPrintMode={isPrintMode}>{hagakiInfo.postalcode_left}</PostalCodeLeft>
        <PostalCodeRight isPrintMode={isPrintMode}>{hagakiInfo.postalcode_right}</PostalCodeRight>
        <div css={Address1}>{hagakiInfo.address1}</div>
        <div css={Address2}>{hagakiInfo.address2}</div>
        <Name size={numberOfFirstNames()}>
          <div>{hagakiInfo.lastName}</div>
          <div>
            {hagakiInfo.firstNameSuffixList.map((d, index) => (
              // biome-ignore lint: cannot find better key
              <div key={index} css={Suffix}>
                <div>{d.firstName}</div>
                <div>{d.suffix}</div>
              </div>
            ))}
          </div>
        </Name>
      </div>
      <div>
        <div css={FromAddress1}>{hagakiData?.[0]?.address1}</div>
        <div css={FromAddress2}>{hagakiData?.[0]?.address2}</div>
        <div css={FromName}>
          <div>{hagakiData?.[0]?.lastName}</div>
          <div css={FromFirstName}>
            <div>{hagakiData?.[0]?.firstNameSuffixList?.[0]?.firstName}</div>
            <div>{hagakiData?.[0]?.firstNameSuffixList?.[1]?.firstName}</div>
          </div>
        </div>
        <FromPostalCodeLeft isPrintMode={isPrintMode}>{hagakiData?.[0]?.postalcode_left}</FromPostalCodeLeft>
        <FromPostalCodeRight isPrintMode={isPrintMode}>{hagakiData?.[0]?.postalcode_right}</FromPostalCodeRight>
      </div>
    </WorkSpace>
  );
};

const WorkSpace = styled.div<{ isPrintMode: boolean }>`
  position: relative;
  width: fit-content;
  box-sizing: border-box;
  height: ${(props) => (props.isPrintMode ? 'calc(100vh - 4px)' : '100vh')};
  border: ${(props) => (props.isPrintMode ? '1px solid transparent' : '1px solid gray')};
`;

const NengajoImage = styled.img<{ isPrintMode: boolean }>`
  height: 100%;
  visibility: ${(props) => (props.isPrintMode ? 'hidden' : 'visible')};
`;

const PostalCode = css`
  position: absolute;
  top: 8.5%;
  font-size: 3.5vh;
  font-weight: 600;
`;

const PostalCodeLeft = styled.div<{ isPrintMode: boolean }>`
  ${PostalCode};
  letter-spacing: ${(props) => (props.isPrintMode ? '2.75vh' : '2.75vh')};
  right: ${(props) => (props.isPrintMode ? '33%' : '33%')};
`;

const PostalCodeRight = styled.div<{ isPrintMode: boolean }>`
  ${PostalCode};
  letter-spacing: ${(props) => (props.isPrintMode ? '2.5vh' : '2.5vh')};
  right: ${(props) => (props.isPrintMode ? '5.5%' : '5.5%')};
`;

const Address = css`
  position: absolute;
  top: 16%;
  height: 64vh;
  font-size: 3.25vh;
  font-weight: 600;
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
  font-weight: 700;
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
  font-weight: 600;
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
  font-weight: 600;
`;

const FromFirstName = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FromPostalCode = css`
  position: absolute;
  bottom: 13%;
  font-size: 2.75vh;
  font-weight: 600;
  letter-spacing: 1vh;
`;

const FromPostalCodeLeft = styled.div<{ isPrintMode: boolean }>`
  ${FromPostalCode};
  left: ${(props) => (props.isPrintMode ? '6.75%' : '6.5%')};
  bottom: ${(props) => (props.isPrintMode ? '15%' : '13%')};
`;

const FromPostalCodeRight = styled.div<{ isPrintMode: boolean }>`
  ${FromPostalCode};
  left: ${(props) => (props.isPrintMode ? '19.5%' : '19.25%')};
  bottom: ${(props) => (props.isPrintMode ? '15%' : '13%')};
`;

export default HagakiDislay;
