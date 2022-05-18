import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login/Login";
import LoginMain from "./Pages/Login/LoginMain";
import CompleteForm from "./Pages/Complete/CompleteForm";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/complete" element={<CompleteForm />} />
          {/* <Route path='/' element={}/>
              <Route path='/' element={}/>
              <Route path='/sellcar' element={}/>
              <Route path='/confirm' element={}/>
              <Route path='/requestform' element={}/>
              <Route path='/admin' element={}/> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
