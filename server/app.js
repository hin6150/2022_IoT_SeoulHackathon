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
    
    console.log(result);
    realData = result;
    db.close();
  });
});

app.get('/api', (req, res) => {
  console.log(realData);
  res.send(realData);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})