var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://lab0104:lab0104@lab0104.sqskoaj.mongodb.net/test";

const options = {useUnifiedTopology: true};

 

MongoClient.connect(url, options, function(err, db) {

  if (err) throw err;

  var dbo = db.db("lab0104");

  dbo.collection("parking").find({}, { projection: { _id: 0, observationtime: 1, date: 1 } }).toArray(function(err, result) {

    if (err) throw err;

    console.log(result);

    db.close();

  });

});