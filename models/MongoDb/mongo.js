const MongoClient = require('mongodb').MongoClient;
const findUserById = require('./findUserById.js');
const errorHandler = require('../../helpers/errorhandler.js');
const url = "mongodb://localhost:27017/"; //Default url for MongoDB server

let db;


//Connect to mongodb database
MongoClient.connect(url, function(err,client){
  if(err){
    console.log()
    errorHandler('Unable to connect to MongoDB','MongoClient.connect','mongo.js',__dirname);
  }
  const database = client.db('userhistory');
  const collection = database.collection('history and images');
  db = collection;
  console.log('Connected to MongoDb database');
})



const mongo = (a) => {
      db.insertOne(a, (err, res) => {
        if (err){
          errorHandler('Error while unserting user object in mongodb','mongo','mongo.js',__dirname);
        }
        console.log("User inserted");
      });
}



const findAndSendUserInfo = async (id, res, obj) => {
    const user = await findUserById(id, db);
    console.log(user, 'this is mongodb user info');
    obj.totalFetched = user.totalFetched;
    obj.profileImage = user.profileImage;
    obj.totalImages = user.totalImages;
    res.send(obj);
}


const updateImages = async (id, path) => {

    const user = await findUserById(id, db);
    user.images.push(path);
    let number = user.totalImages;
    db.update({
      id: `${id}`
    }, {
      $set: {
        images: user.images,
        totalImages: ++number,
      }
    }, (err, res) => {
      if (err){
        errorhandler('Erro while trying to update images','updateImages','mongo.js',__dirname);
      }
    });
}

const saveFetchedUrl = async (id, urlToSave, hostname) => {
  try {
      const user = await findUserById(id, db);
      let number = user.totalFetched;
      if (user.history[`${hostname}`]) {
        const group = user.history[`${hostname}`];
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
        await db.update({
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
        await db.update({
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
  } catch (e) {
    console.log('Something happend while trying to save fetched url');
  }
}


const saveHtml = async (id,group,urlToSave,html)=>{
    const user = await findUserById(id,db);
    const historyArray = user.history[`${group}`];
    let index;
    for(let i = 0; i < historyArray.length; i++){
      if(historyArray[i]['url'] === urlToSave){
        index = i;
        break;
      }
    }
    historyArray[`${index}`].html = html;
    await db.update({
      id: `${id}`
    }, {
      $set: {
        history: user.history,
      }
    }, (err, res) => {
      if (err) throw err;
    });
}

module.exports = {
  mongo,
  findAndSendUserInfo,
  updateImages,
  saveFetchedUrl,
  saveHtml,
}
