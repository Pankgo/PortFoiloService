const exp = require('constants');
const crypto = require('crypto');
const { mode } = require('crypto-js');

// 블록 해시 계산 함수
function calculateHash(index, previousHash, timestamp, data, nonce) {
    return crypto.createHash('sha256').update(index + previousHash + timestamp + data + nonce).digest('hex');
}

// Proof of Work 알고리즘 구현
function proofOfWork(index, previousHash, timestamp, data, difficulty) {
    let nonce = 0;
    let hash = calculateHash(index, previousHash, timestamp, data, nonce);
    while (!hash.startsWith('0'.repeat(difficulty))) {
        nonce++;
        hash = calculateHash(index, previousHash, timestamp, data, nonce);
    }
    return { nonce, hash };
}

// 난이도 설정
const difficulty = 4;

// 테스트 데이터
const index = 1;
const previousHash = '0000000000000000000000000000000000000000000000000000000000000000'; // 이전 블록의 해시
const timestamp = '1714627439444';
const data = 'Hello, blockchain!';

// Proof of Work 알고리즘 실행
const { nonce, hash } = proofOfWork(index, previousHash, timestamp, data, difficulty);

// 결과 출력
console.log(`Nonce: ${nonce}`);
console.log(`Hash: ${hash}`);

//export { proofOfWork }