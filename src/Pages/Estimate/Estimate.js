import React, { useEffect } from 'react';
import { ProgressBar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentEstimateState,
  lastEstimateState,
  EstimateCarInfo,
  UserInputMileageState,
  EstimateCarOption,
} from '../../atoms';
import { MdOutlineNavigateNext } from 'react-icons/md';
import styled, { css } from 'styled-components';
import Graph from '../Graph/Graph';
import StateOne from './States/StateOne';
import StateFour from './States/StateFour';
import PhotoCard from '../Sellcar/PhotoCard';

const Estimate = () => {
  const [currentEstimate, setCurrentEstimate] =
    useRecoilState(currentEstimateState);
  const [estimateCarInfo, setEstimateCarInfo] = useRecoilState(EstimateCarInfo);
  const setEstimateCarOption = useSetRecoilState(EstimateCarOption);
  const [userInputMileage, setUserInputMileage] = useRecoilState(
    UserInputMileageState
  );
  const [lastEstimate, setLastEstimate] = useRecoilState(lastEstimateState);
  const { owner, car_name } = estimateCarInfo;

  useEffect(() => {
    fetch('http://localhost:3000/Data/Dino/carData.json')
      .then(res => res.json())
      .then(data => {
        setEstimateCarInfo(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/Data/Dino/carOption.json')
      .then(res => res.json())
      .then(data => {
        setEstimateCarOption(data);
      });
  }, []);

  const getUserInputMileage = e => {
    setUserInputMileage(e.target.value);
  };

  const nextProcess = () => {
    setCurrentEstimate(prev => prev + 1);
    lastEstimate <= currentEstimate && setLastEstimate(currentEstimate + 1);
  };

  const prevProcess = () => {
    setCurrentEstimate(prev => prev - 1);
  };

  const goToProcess = id => {
    id <= lastEstimate && setCurrentEstimate(id);
  };

  return (
    <Background>
      <BodyWrapper>
        <EstimateWrapper>
          <ProcessBox>
            <ProcessState>
              {PROCESS_STATE.map(({ id, text }) => (
                <CurrentProcess
                  key={id}
                  active={currentEstimate + 1 === id}
                  onClick={() => goToProcess(id - 1)}
                >
                  {text}
                  {id !== PROCESS_STATE.length && <NextIcon />}
                </CurrentProcess>
              ))}
            </ProcessState>
            <PercentageBar
              now={5 + (currentEstimate / PROCESS_STATE.length) * 100}
            />
          </ProcessBox>
          {/* STATE 0 : 차량정보 확인 */}
          <StateOne nextProcess={nextProcess} prevProcess={prevProcess} />
          {/* STATE 1 : 예상시세 표출 */}
          {currentEstimate === 1 && (
            <ContentBox>
              <ContentTitle>
                <OwnerTag>{owner}</OwnerTag>님의 <CarTag>{car_name}</CarTag> 🚙
                <br />
                예상시세는 다음과 같습니다.
              </ContentTitle>
              <Graph />
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
          {/* STATE 2 : 주행거리 입력 */}
          {currentEstimate === 2 && (
            <ContentBox>
              <ContentTitle>
                보다 정확한 견적을 위해
                <br /> 주행거리를 입력해주세요
              </ContentTitle>
              <InputBox
                placeholder="12,345"
                onChange={e => getUserInputMileage(e)}
                value={userInputMileage}
                type="number"
              />
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
          {/* STATE 3 : 추가옵션 입력 */}
          <StateFour nextProcess={nextProcess} prevProcess={prevProcess} />
          {/* STATE 4 : 추가정보 입력 */}
          {currentEstimate === 4 && (
            <ContentBox>
              <ContentTitle>
                보험 외 사고 처리를
                <br /> 하신 적이 있다면 알려주세요
              </ContentTitle>
              <InputBox
                placeholder="추가입력 사항"
                // onChange={e => getUserInputOwner(e)}
                // value={userInputOwner}
              />
              <button>보험 외 사고 처리를 한 적이 없어요</button>
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
          {/* STATE 5 : 사진등록 */}
          {currentEstimate === 5 && (
            <ContentBox>
              <ContentTitle>차량 사진을 올려주세요</ContentTitle>
              <PhotoInputContainer>
                <ContentSubTitle>필수 사진</ContentSubTitle>
                <ContentSubInfo>
                  정면, 후면, 측면, 계기판 사진을 올려주세요
                </ContentSubInfo>
                <PhotoInputWrapper>
                  <PhotoInputLine>
                    {['정면', '후면', '측면', '계기판'].map((value, index) => (
                      <PhotoCard
                        key={index}
                        index={index}
                        value={value}
                        // setCarImages={setCarImages}
                        // carImages={carImages}
                        // setThumbnails={setThumbnails}
                        // thumbnails={thumbnails}
                      />
                    ))}
                  </PhotoInputLine>
                </PhotoInputWrapper>
                <ContentSubTitle>참고 사진</ContentSubTitle>
                <ContentSubInfo>
                  옵션이나 사고부위 등 참고가 될 만한 사진을 올려주세요
                </ContentSubInfo>
                <PhotoInputWrapper>
                  <PhotoInputLine>
                    {['+', '+', '+', '+'].map((value, index) => (
                      <PhotoCard
                        key={index}
                        index={index}
                        value={value}
                        // setCarImages={setCarImages}
                        // carImages={carImages}
                        // setThumbnails={setThumbnails}
                        // thumbnails={thumbnails}
                      />
                    ))}
                  </PhotoInputLine>
                </PhotoInputWrapper>
              </PhotoInputContainer>
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
        </EstimateWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default Estimate;

const ContentSubTitle = styled.h3`
  font-size: medium;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ContentSubInfo = styled.div`
  font-size: small;
  margin-top: 0.3rem;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const PhotoInputContainer = styled.div`
  /* border: 1px solid black; */
`;

const PhotoInputWrapper = styled.div`
  margin: 1rem 0;
  /* border: 1px solid black; */
`;

const PhotoInputLine = styled.div`
  ${({ theme }) => theme.flex.flexBox}
`;

const OwnerTag = styled.span`
  color: ${({ theme }) => theme.colors.primaryBlue};
`;

const CarTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.2rem;
  padding: 0 0.3rem;
  font-size: 22px;
`;

const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.disabled};
  border-radius: 5px;
  padding: 1em;
`;

const InputButton = styled(Button)`
  width: 100%;
  height: 3rem;
  border-radius: 100rem;
  margin-top: 5rem;
  font-weight: 600;
`;

const ButtonSet = styled.div`
  ${({ theme }) => theme.flex.flexBox('', '', 'space-between')}
  margin-top: 4rem;
`;

const NextButton = styled(Button)`
  width: 49%;
  height: 3rem;
  border-radius: 100rem;
  font-weight: 600;
`;

const PrevButton = styled(Button)`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
  color: ${({ theme }) => theme.colors.primaryBlue};
  width: 49%;
  height: 3rem;
  border-radius: 100rem;
  font-weight: 600;
`;

const ProcessBox = styled.section`
  ${({ theme }) => theme.flex.flexBox('column')}
  height: 5rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const ProcessState = styled.div`
  ${({ theme }) => theme.flex.flexBox}
`;

const CurrentProcess = styled.button`
  ${({ theme }) => theme.flex.flexBox}
  border: 0;
  background: 0;
  padding: 0;
  font-size: medium;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.gray};

  &:last-child {
    margin-right: 0;
  }

  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.colors.primaryBlue};
      font-weight: bold;
    `}
`;

const NextIcon = styled(MdOutlineNavigateNext)`
  font-size: medium;
  margin: 0 0.3rem;
  cursor: auto;
`;

const PercentageBar = styled(ProgressBar)`
  width: 100%;
  height: 5px;
  border-radius: 0;
  position: absolute;
  bottom: 0;
`;

const ContentBox = styled.section`
  width: 100%;
  padding: 10%;
  background-color: white;
  position: absolute;
`;

const ContentTitle = styled.h2`
  font-size: x-large;
  font-weight: 600;
  line-height: 1.9rem;
  margin-bottom: 2.3rem;
  color: ${({ theme }) => theme.colors.blackC};
`;

const EstimateWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);
`;

const BodyWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  position: relative;
  width: 640px;
  height: 100%;

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
`;

const PROCESS_STATE = [
  // {
  //   id: 1,
  //   text: '소유자명',
  // },
  {
    id: 1,
    text: '차량정보',
  },
  {
    id: 2,
    text: '예상시세',
  },
  {
    id: 3,
    text: '주행거리',
  },
  {
    id: 4,
    text: '추가옵션',
  },
  {
    id: 5,
    text: '추가입력',
  },
  {
    id: 6,
    text: '사진등록',
  },
];
