
const { Web3 } = require('web3');

const web3 = new Web3('http://localhost:7545');

const deployedAddress = '0x4Ee8999f401627f6eA4f457b7a59655Dc76EfF74'; // 컨트랙트 계정 주소
const fs = require('fs');
const abi = JSON.parse(fs.readFileSync('./build/contracts/TESTToken.json')).abi;
const myContract = new web3.eth.Contract(abi, deployedAddress);
myContract.handleRevert = true;

async function interact() {
  try {
    const myNumber = await myContract.methods.name().call();
    console.log('token name: ' + myNumber);
  } catch (error) {
    console.error(error);
  }
}

interact();