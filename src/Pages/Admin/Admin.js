import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import CarCard from "./CarCard";
import CarLine from "./CarLine";
import Pagination from "./Pagination";

const Admin = ({ isNew, setNew }) => {
  const [cars, setCars] = useState([]);

  //한 페이지 당 보여줄 차 목록의 개수
  const limit = 10;
  //현재 페이지 번호
  const [page, setPage] = useState(1);
  //현재 페이지의 첫 게시물 위치
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetch("/car/myCars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data.myCarsInfo);
      });
    setPage("admin");
    console.log("cars", cars);
  }, []);

  return (
    <CarContainer>
      <CarWrapper>
        <CarTable>
          <TableRow>
            <TableHead>순서</TableHead>
            <TableHead>차량 번호</TableHead>
            <TableHead>견적 요청 접수</TableHead>
            <TableHead>담당 딜러 배정</TableHead>
            <TableHead>딜러 방문 상담</TableHead>
            <TableHead>판매 요청</TableHead>
            <TableHead>판매 완료</TableHead>
          </TableRow>
          {cars.length !== 0 &&
            cars.slice(offset, offset + limit).map((car) => {
              return (
                <TableRow key={car.id}>
                  <CarLine car={car} isNew={isNew} setNew={setNew} />
                </TableRow>
              );
            })}{" "}
          {/* 주석 처리 시작
          <TableRow>
            <CarLine />
          </TableRow>
          <TableRow>
            <CarLine />
          </TableRow>
          <TableRow>
            <CarLine />
          </TableRow>
          <TableRow>
            <CarLine />
          </TableRow>
          {/* 주석 처리 끝 */}
        </CarTable>
      </CarWrapper>
      <Pagination total={16} limit={limit} page={page} setPage={setPage} />
    </CarContainer>
  );
};

const CarTable = styled.table`
  margin: 0 auto;
  width: 80%;
  border-radius: 0 0 25px 25px;
  tr:first-child {
    background-color: #5c1049;
    color: white;
    font-weight: 600;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableRow = styled.tr`
  width: 100%;
`;

const TableHead = styled.th`
  width: 13%;
  padding: 15px;
  font-size: 15px;
`;

const CarContainer = styled.div`
  width: 100%;
  margin: 0px auto;
  margin-top: 30px;
  padding: 10px;
  box-sizing: border-box;
  @media only screen and (max-width: 640px) {
    width: 580px;
    padding: 0px;
    margin: 20px auto;
    padding-left: 0;
  }
`;
const CarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default Admin;
