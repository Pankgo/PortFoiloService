module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache 호스트
      port: 7545,            // Ganache 포트
      network_id: "*",       // 모든 네트워크에 연결
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",      // Solidity 컴파일러 버전
    }
  },
};
