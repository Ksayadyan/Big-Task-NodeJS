const {URL} = require('url')
const mongod = require ('../../models/MongoDb/mongo.js')
const router = require('./router.js')
const errorHandler = require('../../helpers/errorhandler.js');

const fetchurl = async (req, res) => {
    try {
      if (req.session.userId) {
        const fetchedUrl = new URL(req.body.url);
        const hostname = fetchedUrl.hostname;
        await mongod.saveFetchedUrl(req.session.userId, req.body.url, hostname);
        res.sendStatus(201);

      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      res.sendStatus(507);
      errorHandler('Error occured while trying to save fetched url','fetchurl','UsersHistory.js',__dirname);
    }
  }

  //Saveing fetched url's html in mogodb
  const saveHtml = async (req, res) => {
    try {
      if (req.session.userId) {
        const fetchedUrl = new URL(req.body.url);
        const html = req.body.html;
        const hostname = fetchedUrl.hostname;
        await mongod.saveHtml(req.session.userId, hostname, req.body.url, html);
        res.sendStatus(201);
      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      res.sendStatus(507);
      errorHandler('Error occured while saving html','saveHtml','UsersHistory',__dirname);
    }
  }

//Saving fetched url in mongodb
router.post('/fetchurl',fetchurl);
//Saving html in mongodb
router.post('/savehtml',saveHtml);
