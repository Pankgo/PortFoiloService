import React, { useEffect, useState } from 'react';

function CheckLogin() {
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

  return (account);
}

export default CheckLogin;