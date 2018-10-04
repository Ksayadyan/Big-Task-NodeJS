const {URL} = require('url')
const mongod = require ('../../models/MongoDb/mongo.js')
const router = require('./router.js')

const fetchurl = async (req, res) => {
    try {
      if (req.session.userId) {
        const fetchedUrl = new URL(req.body.url);
        const hostname = fetchedUrl.hostname;
        await mongod.saveFetchedUrl(req.session.userId, req.body.url, hostname);
        res.send('Url saved');
  
      } else {
        res.send('Not authorized');
      }
    } catch (e) {
      console.log('Error occured while trying to save fetched url');
      console.log(e);
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
        res.send('OK');
      } else {
        res.send('Not authorized');
      }
    } catch (e) {
      console.log('Error occured while saving html', e);
      res.send('Error');
    }
  }

//Saving fetched url in mongodb
router.post('/fetchurl',fetchurl);
//Saving html in mongodb
router.post('/savehtml',saveHtml);
