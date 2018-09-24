const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


let mongo=(a)=>{
    MongoClient.connect(url, (err, client)=> {
      if (err) throw err;
      let db = client.db("userhistory");
      db.createCollection("history and images", (err, res)=> {
        if (err) throw err;
        console.log("Collection created!");
          db.collection("history and images").insertOne(a,(err,res)=>{
          if (err) throw err;
          console.log("User inserted");
      })
        client.close();
      });
    });
}
module.exports.mongo = mongo;
