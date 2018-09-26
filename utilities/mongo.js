const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


let mongo = (a) => {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    let db = client.db("userhistory");
    db.createCollection("history and images", (err, res) => {
      if (err) throw err;
      console.log("Collection created!");
      db.collection("history and images").insertOne(a, (err, res) => {
        if (err) throw err;
        console.log("User inserted");
      })
      client.close();
    });
  });
}



let findAndSendUserInfo = (id, res, obj) => {
  MongoClient.connect(url, async (err, client) => {
    if (err) throw err;
    let db = client.db('userhistory');
    let user = await db.collection('history and images').findOne({
      id: `${id}`
    });
    console.log(user, 'this is mongodb user info');
    obj.totalFetched = user.totalFetched;
    obj.profileImage = user.profileImage;
    obj.totalImages = user.totalImages;
    res.send(obj);
  })
}


module.exports.mongo = mongo;
module.exports.findAndSendUserInfo = findAndSendUserInfo;
