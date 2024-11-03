import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home"
import Login from "./Pages/login"
import Createpage from "./Pages/createpage"
import ShowCareer from "./Pages/showCareer"
import Cvpage from "./Pages/CVpage"
import Export from "./Pages/export"
import Cuser from "./Pages/Cuserpage"
import React, { useEffect, useState } from 'react';

function App() {
  const [account, setAccount] = useState(null);

  async function loadMetaMask() {
    if (window.ethereum) {
      try {
        // 메타마스크 계정 요청
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]); // 첫 번째 계좌 설정
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      console.error("MetaMask not installed");
    }
  }



  useEffect(() => {
    loadMetaMask();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        {account ?         <>
        <Route path="/Cuser" element={<Cuser/>}></Route>
        <Route path="/export" element={<Export/>}></Route>
        <Route path = "/createpage" element={<Createpage/>}></Route>
        <Route path = "/showcareer" element = {<ShowCareer/>}></Route>
        <Route path = "/cvpage" element = {<Cvpage/>}></Route></>: null }
      </Routes>
    </BrowserRouter>

  );
}
export default App;
