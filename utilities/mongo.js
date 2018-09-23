const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


let mongo=(a)=>{
    MongoClient.connect(url, (err, client)=> {
      if (err) throw err;
      let db = client.db("userhistory112");
      db.createCollection("history and imgaes1", (err, res)=> {
        if (err) throw err;
        console.log("Collection created!");
          db.collection("history and imgaes1").insertOne(a,(err,res)=>{
          if (err) throw err;
          console.log("user inserted");
      })
        client.close();
      });
    });
}
module.exports.mongo=mongo;





