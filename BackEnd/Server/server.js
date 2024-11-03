const express = require("express"); 
const app     = express();
const cors = require("cors");
const PORT    = 3001; // 포트번호 설정
const connection = require('../DB/db')
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
// 서버 연결 시 발생
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

//회사 DB 데이터 확인
app.post('/checkData', (req, res) => {
  const { username, worklog,startdate,enddate } = req.body;
  if (!username || !worklog ||!startdate || !enddate ) {
    console.log("데이터를 넣어주세요");
    return res.json({ result: false });
  }

  const query = 'SELECT * FROM companyDB WHERE workerName = ? AND startdate = ? AND enddate = ?';
const queryParams = [username, startdate, enddate];
console.log(queryParams);
connection.query(query, queryParams, (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return res.status(500).json({ error: '서버 오류' });
  }
  console.log(results.length);
    if (results.length != 0) {
      console.log("성공");
      res.json({ result: true }); 
    } else {
      console.log("실패");
      res.json({ result: false }); 
    }
  });
});
