const MongoClient = require('mongodb').MongoClient;
const findUserById = require('./findUserById.js');
const errorHandler = require('../../helpers/errorhandler.js');
const url = "mongodb://localhost:27017/"; //Default url for MongoDB server
const HTML = require('html-parse-stringify');

let db;
let dbHtml;


//Connect to mongodb database
MongoClient.connect(url, function(err,client){
  if(err){
    console.log()
    errorHandler('Unable to connect to MongoDB','MongoClient.connect','mongo.js',__dirname);
  }
  const database = client.db('userhistory');
  const collection = database.collection('history and images');
  db = collection;
  const collectionHtml = database.collection('htmls');
  dbHtml = collectionHtml;
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

const saveFetchedUrl = async (id, urlToSave, hostname,res) => {
  try {
      const user = await findUserById(id, db);
      let number = user.totalFetched;
      if (user.history[`${hostname}`]) {
        const group = user.history[`${hostname}`];
        for(let i = 0; i < group.length; i++){
          if(group[i]['url'] === urlToSave){
            console.log('Fieled with same url found, no changes performed');
            return;
            // res.sendStatus(304);
            // throw new Error('Duplicate url found')
          }
        }
        console.log(`Group ${hostname} exists.Trying to push`);
        user.history[`${hostname}`].push({
          url: urlToSave,
        });
        await db.update({
          id: `${id}`
        }, {
          $set: {
            history: user.history,
            totalFetched: ++number
          }
        }, (err, res) => {
          if (err) {
            errorHandler('Error while updating document', 'saveFetchedUrl','mongo.js', __dirname)
          }
        });
        console.log('Succesfully pushed');
        dbHtml.insertOne({id:id, url:urlToSave, html: ''},(err,res)=>{
          if(err){
            errorHandler('Unable to insert document in userHtml database','saveFetchedUrl','mongo.js',__dirname)
          }
        })
      } else {
        console.log(`Group ${hostname} doesn't exists. Trying to create`);
        user.history[`${hostname}`] = [];
        user.history[`${hostname}`].push({
          url: urlToSave,
        });
        await db.update({
          id: `${id}`
        }, {
          $set: {
            history: user.history,
            totalFetched: ++number
          }
        }, (err, res) => {
          if (err){
            errorHandler('Error while updating document(second section)', 'saveFetchedUrl','mongo.js', __dirname)
          }
        });
        console.log('Created and pushed Succesfully');
        dbHtml.insertOne({id:id, url:urlToSave, html: ''},(err,res)=>{
          if(err){
            errorHandler('Unable to insert document in userHtml database','saveFetchedUrl','mongo.js',__dirname)
          }
        })
      }
  } catch (e) {
    console.log('Duplicate found',e);
  }
}


const saveHtml = async (id,group,urlToSave,html)=>{
    dbHtml.update({id:id, url: urlToSave},{
      $set: {
        html: html
      }
    },(err,res)=>{
      if(err){
        errorHandler('Error while updating document', 'saveHtml','mongo.js', __dirname)
      }
    });
}


const fetchHistory = async (id,res) => {
  const history = await db.find({id:`${id}`}).project({ _id: 0, history: 1}).toArray();

  //{$and: [{id:id},{history:{$elemMatch:{url:{$ne:""}}}}]}
  //{id:id},{history:{$elemMatch:{url:{$ne:""}}}}
  res.send(history);
  await  console.log(history);
}


const getSavedHtml = async (req,res)=>{
  if(req.session.userId){
    const user = await dbHtml.findOne({id: req.session.userId, url: req.body.url});
    const html = HTML.parse(user.html)
    res.send(html);
  }else{
    res.sendStatus(401);
  }
}

module.exports = {
  mongo,
  findAndSendUserInfo,
  updateImages,
  saveFetchedUrl,
  saveHtml,
  fetchHistory,
  getSavedHtml
}
