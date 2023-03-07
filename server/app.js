const express = require("express");
const fs = require('fs') // 디렉토리 접근 모듈
const app = express();
const port = 3000;

app.use(
  express.json({
    limit: "50mb",
  })
);

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
  console.log('sql 변경 시 재시작 없이 반영되도록 함');
  delete require.cache[require.resolve('./sql.js')];
  sql = require('./sql.js');
})

let sql = require('./sql.js');

const db = {
  database: 'hong', // 생성한 데이터베이스 이름
  connectionLimit: 10,
  host: '', // 데이터베이스 서버 호스트 주소
  port: , // 데이터베이스 서버 포트 번호
  user: '', // 데이터베이스 계정 정보
  password: '' // 데이터베이스 계정 정보
}

const dbPool = require('mysql').createPool(db)

const req = {
  async db(alias, param = [], where = '') {
    return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
      if(error) {
        if(error.code != 'ER_DUP_ENTRY')
          console.log(error);
        resolve({
          error
        });
      } else resolve(rows);
    }));
  }
}

app.post('/api/:alias', async(request, res) => {
  try{
    res.send(await req.db(request.params.alias, request.body.param))
  } catch(err){
    res.status(500).send({
      error: err
    });
  }
});
// let MongoClient = require("mongodb").MongoClient;
// let url = "mongodb+srv://lab0104:lab0104@lab0104.sqskoaj.mongodb.net/test";
// const options = { useUnifiedTopology: true };
// MongoClient.connect(url, options, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("lab0104");
//   // function TotalParking(TPL) {
//   //   console.log("2층 총 주차공간: " + TPL);
//   // }
//   dbo
//     .collection("Parking")
//     .find(
//       { observationtime: "2022082422" },
//       {
//         projection: {
//           _id: 0,
//           TotalParkingLot: 1,
//           availableparking: 1,
//           emptyparking: 1,
//           date: 1,
//         },
//       }
//     )
//     .toArray(function (err, result) {
//       if (err) throw err;
//       // TotalParking(dbo.collection("parking").find());
//       lastParkData = result;
//       // db.close();
//     });

//   dbo
//     .collection("InnerComponentData")
//     .find({}, { projection: { _id: 0, No: 0, observationtime: 0 } })
//     .sort({ serial: 1 })
//     .toArray(function (err, result) {
//       if (err) throw err;

//       // console.log(result);
//       database = result;
//       db.close();
//     });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
