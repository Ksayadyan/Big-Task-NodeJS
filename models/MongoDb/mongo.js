const MongoClient = require('mongodb').MongoClient;
const findUserById = require('./findUserById.js');
const errorHandler = require('../../helpers/errorhandler.js');

//Getting configuration constrants
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


//Insterting user object in mongodb database
const mongo = (a) => {
      db.insertOne(a, (err, res) => {
        if (err){
          errorHandler('Error while unserting user object in mongodb','mongo','mongo.js',__dirname);
        }
        console.log("User inserted");
      });
}


//find user object from mongodb database and send back to client
const findAndSendUserInfo = async (id, res, obj) => {
    const user = await findUserById(id, db);
    console.log(user, 'this is mongodb user info');
    obj.totalFetched = user.totalFetched;
    obj.profileImage = user.profileImage;
    obj.totalImages = user.totalImages;
    res.send(obj);
}



//updating the number of total images (after image upload) 
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

//change the profile picture path in mongodb database for user
const editProfilePic = async (req, res) => {
    try{
    await db.update({
      id: `${req.userId}`
    }, {
      $set: {
        profileImage: req.body.path
      }
    });
    res.send(205);
  }catch(e){
    res.sendStatus(503);
    errorHandler('Unable to update profile pick','editProfilePick','mongo.js', __dirname);
  }
}


//Getting image paths form mongodb database
const getImages = async (req, res) => {
    try{
      req.query.page = parseInt(req.query.page);
      if(!Boolean(req.query.page)){
        res.send(400);
        return;
      }
      const result = await db.find({id: `${req.userId}`})
      .project({images: {$slice: [(req.query.page-1)*3,req.query.page*3]}, totalImages: 1, _id: 0}).toArray();
      console.log(result);
      res.send(result);     
    }catch(e){
      console.log(e);
      res.sendStatus(503);
      errorHandler('Unable to get images', 'getImages','mongo.js',__dirname)
    }
}


//Updating totalFetched number mongodb database (after url fetch);
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

//Saving HTML in mongodb database
const saveHtml = async (id,group,urlToSave,html)=>{
    dbHtml.insert({id:id, url: urlToSave, html:html},(err,res)=>{
      if(err){
        errorHandler('Error while updating document', 'saveHtml','mongo.js', __dirname)
      }
    });
}

//Getting already saved html from mongodb database
const getSavedHtml = async (req,res)=>{
    const user = await dbHtml.findOne({id: req.userId, url: req.body.url});
    let html;
    try{
      html = HTML.parse(user.html);
    }catch(e){
      console.log(e);
      res.sendStatus(404);
      return;
    }
    res.send(html);
}

module.exports = {
  mongo,
  findAndSendUserInfo,
  updateImages,
  saveFetchedUrl,
  saveHtml,
  getSavedHtml,
  getImages,
  editProfilePic,
}
