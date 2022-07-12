import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login/Login';
import LoginMain from './Pages/Login/LoginMain';
import Complete from './Pages/Estimate/Complete';
import Admin from './Pages/Admin/Admin';
import React, { useState } from 'react';
import Estimate from './Pages/Estimate/Estimate';
import MyState from './Pages/MyPage/MyState';
import SignIn from './Pages/SignIn/SignIn';
import KakaoRedirect from './Pages/Login/Kakao/KakaoRedirect';
import CompleteForm from './Pages/Complete/CompleteForm';
import RequestForm from './Pages/Requestform/RequestForm';
import Reconfirm from './Pages/Sellcar/Reconfirm';
import SellCar from './Pages/Sellcar/Sellcar';
import Graph from './Pages/Graph/Graph';
import Admin from './Pages/Admin/Admin';
import React, { useEffect, useState } from 'react';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import ReaquestTable from './Pages/Admin/RightSection/RequestDetails/ReaquestTable';

function App() {
  const [isNew, setNew] = useState(-1);
  const [page, setPage] = useState('default');

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Header isNew={isNew} setNew={setNew} page={page} />
        <Routes>
          <Route path="/" element={<Login setPage={setPage} />} />
          <Route
            path="/login"
            exact
            element={<LoginMain setPage={setPage} />}
          />
          <Route
            path="/login"
            exact
            element={<LoginMain setPage={setPage} />}
          />
          <Route
            path="/complete"
            element={
              <RequestForm isNew={isNew} setNew={setNew} setPage={setPage} />
            }
          />
          <Route path="/reconfirm" element={<Reconfirm setPage={setPage} />} />
          <Route path="/sellcar" element={<SellCar setPage={setPage} />} />
          <Route path="/graph" element={<Graph />} />
          (
          <Route
            path="/dealers/estimates"
            element={<Admin isNew={isNew} setNew={setNew} setPage={setPage} />}
          />
          ) (
          <Route
            path="/dealers/login"
            element={
              <AdminLogin isNew={isNew} setNew={setNew} setPage={setPage} />
            }
          />
          )
        </Routes>
        <Footer page={page} />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
