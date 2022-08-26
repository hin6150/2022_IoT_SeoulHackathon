var MongoClient = require('mongodb').MongoClient; // mongoDB 접속

var url = "mongodb+srv://lab0104:lab0104@lab0104.sqskoaj.mongodb.net/test"; // MongoDB 사이트명 

const options = {useUnifiedTopology: true}; 



MongoClient.connect(url, options, function(err, db) {

  if (err) throw err; // err면 err코드 발송

  var dbo = db.db("lab0104"); // db 이름을 lab0104로 지정

  dbo.collection("parking").find({}).toArray(function(err, result) { // lab0104/parking 디렉토리의 모든 내용을 find해서 출력

    if (err) throw err;

    console.log(result);

    db.close();

  });

});