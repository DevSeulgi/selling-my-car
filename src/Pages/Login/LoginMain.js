// modules
// import React, { useState } from "react";

//styles
import styled from "styled-components";

function LoginMain() {
  return (
    <LoginMainWrap>
      <LoginMainBox></LoginMainBox>
      <LoginMainInfo>
        <InfoTitle>
          <p>OOO님의</p>
          <p>차량 시세를 확인해볼까요?</p>
        </InfoTitle>
        <InfoCar>
          <div>
            차량번호: <span>12가1234</span>
          </div>
          <div>
            모델명: <span>아우디</span>
          </div>
          <div>
            연식: <span>2022년 출시</span>
          </div>
        </InfoCar>
        <InfoButton>시세확인</InfoButton>
      </LoginMainInfo>
    </LoginMainWrap>
  );
}

const LoginMainWrap = styled.div`
  /* @media only screen and (max-width: 640px) {
    width: 100%;
    margin: 0px auto;

  } */
  width: 640px;
  margin: 0px auto;
  padding: 20px;
  border: 1px solid black;
`;
const LoginMainBox = styled.div``;
const LoginMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 10px;
  border-top: 1px solid #adadad;
`;
const InfoTitle = styled.div`
  margin-bottom: 10px;
  font-size: 34px;
`;
const InfoCar = styled.div`
  margin: 20px 210px 20px 0px;
  div {
    font-size: 18px;
    margin-bottom: 10px;
  }
  span {
    margin-left: 5px;
  }
`;
const InfoButton = styled.button`
  width: 200px;
  padding: 12px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
`;

export default LoginMain;
