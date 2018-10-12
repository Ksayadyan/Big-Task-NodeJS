const {URL} = require('url');
const request = require('request');
const mongod = require ('../../models/MongoDb/mongo.js')
const errorHandler = require('../../helpers/errorhandler.js');
const HTML = require('html-parse-stringify');

const fetchurl = async (req, res) => {
    try {
      if (req.session.userId) {
        const fetchedUrl = new URL(req.body.url);
        const hostname = fetchedUrl.hostname;
        await mongod.saveFetchedUrl(req.session.userId, req.body.url, hostname,res);
        await request({
          uri: `${req.body.url}/`,
        },(err,response,body)=>{
            const result = HTML.parse(body);
            res.send(result);
        });

      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      res.sendStatus(507);
      console.log(e);
      errorHandler('Error occured while trying to save fetched url','fetchurl','UsersHistory.js',__dirname);
    }
  }

  //Saveing fetched url's html in mogodb

  const saveHtml = async (req, res) => {
    try {
      if (req.session.userId) {
        const fetchedUrl = new URL(req.body.url);
        const hostname = fetchedUrl.hostname;
        let html;
        await request({
          uri: `${req.body.url}/`,
        },async (err,response,body)=>{
          if(err){
            res.send(507);
            errorHandler('Error occured while making a request','saveHtml','UsersHistory', __dirname);
          }
          try{
            await mongod.saveHtml(req.session.userId, hostname, req.body.url, body);
          }catch(e){
            errorHandler('Error occured while saving html','saveHtml','UsersHistory',__dirname);
          }
        });
        res.sendStatus(201);
      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      res.sendStatus(507);
      errorHandler('Unknown error while saving html','saveHtml','UsersHistory',__dirname);
    }
  }


  const browseHistory = async (req,res)=>{
    try{
      if(req.session.userId){
        await mongod.fetchHistory(req.session.userId,res);
      }else{
        res.sendStatus(401);
      }
    }catch(e){
      errorHandler('Unable to fetch history','browseHistory','UsersHistory',__dirname);
    }
  }



// //Saving fetched url in mongodb
// router.post('/fetchurl',fetchurl);
// //Saving html in mongodb
// router.post('/savehtml',saveHtml);
// //fetching history
// router.get('/browseHistory',browseHistory);
// //getting saved html
//router.post('/getSavedHtml',mongod.getSavedHtml);

module.exports = {
  fetchurl,
  saveHtml,
  browseHistory,

}
