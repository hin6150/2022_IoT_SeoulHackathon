const express = require('express')
const app = express()
const port = 3000
app.use(express.json({
  limit: '50mb'
}));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://lab0104:lab0104@lab0104.sqskoaj.mongodb.net/test";
const options = {useUnifiedTopology: true};
MongoClient.connect(url, options, function(err, db) {

  if (err) throw err;
  var dbo = db.db("lab0104");
  // function TotalParking(TPL) {
  //   console.log("2층 총 주차공간: " + TPL);
  // } 
  dbo.collection("Parking").find({observationtime: '2022082422'}, { projection: { _id: 0, TotalParkingLot: 1,
      availableparking: 1, emptyparking:1, date: 1} }).toArray(function(err, result) {
    if (err) throw err;
    // TotalParking(dbo.collection("parking").find());
    lastParkData = result;
    db.close();
  });
});

app.get('/api', (req, res) => {
  res.send(lastParkData);
})

app.post('/api/calendar', (request, response) => {
  // calendar 날짜 두개 -> ['yyyymmdd', 'yyyymmdd']
  const data = request.body.param
  // data를 기준으로 db에서 필요한 자료를 모아서 response.send(자료들)
  console.log(data)
  response.send(data);
})
// 통계페이지 default 차트 -> D-9일부터 D-2일까지의 일주일 평균값 필요
// 온도(섭씨 변환), 습도, 소음, 미세먼지, 초미세먼지, 주차장
// app.get('/api/statistic', (req, res) => {
//   console.log(realData);
//   res.send(realData);
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})