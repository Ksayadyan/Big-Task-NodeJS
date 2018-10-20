const MongoClient = require('mongodb').MongoClient;
const findUserById = require('./findUserById.js');
const errorHandler = require('../../helpers/errorhandler.js');


const {
  MONGO_DATABASE_NAME,
  MONGO_DATABASE_HOST,
  MONGO_DATABASE_USER_NAME,
  MONGO_DATABASE_PASSWORD
} = require('../../constants/constants.js')


const HTML = require('html-parse-stringify');
let url;
if(MONGO_DATABASE_PASSWORD){
  url = `mongodb://${MONGO_DATABASE_USER_NAME}:${MONGO_DATABASE_PASSWORD}@${MONGO_DATABASE_HOST}`;
}else{
  url = `mongodb://localhost:27017`
}

let db;
let dbHtml;


//Connect to mongodb database
MongoClient.connect(url,{useNewUrlParser:true}, function(err,client){
  if(err){
    console.log()
    errorHandler('Unable to connect to MongoDB','MongoClient.connect','mongo.js',__dirname);
  }
  const database = client.db(MONGO_DATABASE_NAME);
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

const saveFetchedUrl = async (id) => {
      const user = await findUserById(id, db);
      let number = user.totalFetched;
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
}


const saveHtml = async (id,group,urlToSave,html)=>{
    dbHtml.insert({id:id, url: urlToSave, html:html},(err,res)=>{
      if(err){
        errorHandler('Error while updating document', 'saveHtml','mongo.js', __dirname)
      }
    });
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
  getSavedHtml
}
