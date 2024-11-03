
// 해쉬 코드 생성 샘플코드
const SHA256 = require('crypto-js/sha256');

// 머클트리생성 샘플 코드
const merkle = require("merkle")


//블록 헤더 클래스
class Header {
  constructor(_height, _previousHash) {
    this.version = Header.getVersion();
    this.height = _height;
    this.timeStamp = Header.getTimeStamp();
    this.previousHash = _previousHash || "0".repeat(64);
  }

  // static으로 만들어서 버전 정보 볼수 있게
  static getVersion() {
    return "1.0.0";
  }
  static getTimeStamp() {
    return new Date().getTime();
  }
}
//블록
class Block {
  constructor(_header, _data) {
    // 받아온 헤더의 버전을 블록에게 주고
    this.version = _header.version;
    // 블록의 높이도 헤더에서 주고
    this.height = _header.height;
    this.timeStamp = _header.timeStamp;
    this.previousHash = _header.previousHash;
    this.data = _data;
    this.merkleRoot = Block.getMerkleRoot(_data);
    this.hash = Block.createBlockHash(_header, Block.getMerkleRoot(_data));
  }

  static getMerkleRoot(_data) {
    const merkleTree = merkle("sha256").sync(_data);
    return merkleTree.root();
  }

  static createBlockHash(_header, _merkleRoot) {
    const values = Object.values(_header);
    const data = values.join("") + _merkleRoot;
    return SHA256(data).toString();
  }
}

const data1 = [
  "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",
];

//노드 생성
function createNode(num,data,_header)
{
  const header = new Header(num,_header);
  const block = new Block(header, data);
  return block;
}

function createFirstNode(string)
{
  const header = new Header(0);
  const block = new Block(header, [string]);
  return block;
}
export {Header, createNode,createFirstNode};