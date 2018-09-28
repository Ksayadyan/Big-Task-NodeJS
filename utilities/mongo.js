const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/"; //Default url for MongoDB server


const mongo = (a) => {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    let db = client.db("userhistory");
    db.createCollection("history and images", (err, res) => {
      if (err) throw err;
      console.log("Collection created!");
      db.collection("history and images").insertOne(a, (err, res) => {
        if (err) throw err;
        console.log("User inserted");
      });
      client.close();
    });
  });
}



const findAndSendUserInfo = (id, res, obj) => {
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
    client.close();
  })
}


const updateImages = (id, path) => {
  MongoClient.connect(url, async (err, client) => {
    if (err) throw err;
    let db = client.db('userhistory');
    let user = await db.collection('history and images').findOne({
      id: `${id}`
    });
    user.images.push(path);
    let number = user.totalImages;
    db.collection('history and images').update({
      id: `${id}`
    }, {
      $set: {
        images: user.images,
        totalImages: ++number
      }
    }, (err, res) => {
      if (err) throw err;
    });
  });
}

const saveFetchedUrl = async (id, urlToSave, hostname) => {
  try {
    MongoClient.connect(url, async (err, client) => {
      if (err) throw err;
      let db = client.db('userhistory');
      let user = await db.collection('history and images').findOne({
        id: `${id}`
      });
      let number = user.totalFetched;
      if (user.history[`${hostname}`]) {
        let group = user.history[`${hostname}`];
        for(let i = 0; i < group.length; i++){
          if(group[i]['url'] === urlToSave){
            console.log('Fieled with same url found, no changes performed');
            throw new Error('Duplicate url found')
          }
        }
        console.log(`Group ${hostname} exists.Trying to push`);
        user.history[`${hostname}`].push({
          url: urlToSave,
          html: '',
        });
        await db.collection('history and images').update({
          id: `${id}`
        }, {
          $set: {
            history: user.history,
            totalFetched: ++number
          }
        }, (err, res) => {
          if (err) throw err;
        });
        console.log('Succesfully pushed');
      } else {
        console.log(`Group ${hostname} doesn't exists. Trying to create`);
        user.history[`${hostname}`] = [];
        user.history[`${hostname}`].push({
          url: urlToSave,
          html: '',
        });
        await db.collection('history and images').update({
          id: `${id}`
        }, {
          $set: {
            history: user.history,
            totalFetched: ++number
          }
        }, (err, res) => {
          if (err) throw err;
        });
        console.log('Created and pushed Succesfully');
      }
    });
  } catch (e) {
    console.log('Something happend while trying to save fetched url');
  }
}


const saveHtml = async (id,group,urlToSave,html)=>{
  MongoClient.connect(url,async (err,client)=>{
    if(err) throw err;
    let db = client.db('userhistory');
    let user = await db.collection('history and images').findOne({
      id: `${id}`
    });
    let historyArray = user.history[`${group}`];
    let index;
    for(let i = 0; i < historyArray.length; i++){
      if(historyArray[i].url === urlToSave){
        index = i;
        break;
      }
    }
    historyArray[index].html = html;
    await db.collection('history and images').update({
      id: `${id}`
    }, {
      $set: {
        history: user.history,
      }
    }, (err, res) => {
      if (err) throw err;
    });
  })
}

module.exports.mongo = mongo;
module.exports.findAndSendUserInfo = findAndSendUserInfo;
module.exports.updateImages = updateImages;
module.exports.saveFetchedUrl = saveFetchedUrl;
module.exports.saveHtml = saveHtml;
