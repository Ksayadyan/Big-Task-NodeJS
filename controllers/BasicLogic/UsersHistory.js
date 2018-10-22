const {URL} = require('url');
const request = require('request');
const mongod = require ('../../models/MongoDb/mongo.js');
const findUserById = require('../../models/MongoDb/findUserById.js');
const errorHandler = require('../../helpers/errorhandler.js');
const HTML = require('html-parse-stringify');
const history = require('../../models/MySQL/MySQLDbHistoryTableDefine.js');
const groups = require('../../models/MySQL/MysqlGroupTableDefine.js');
const queryToIntParser = require('../../helpers/queryToIntParser.js');
const {checkGroupedUrlOrder,
       checkGroupOrder,
       checkUrlOrder,} = require('../../helpers/MysqlOrderChecker.js');

groups.hasMany(history,{
  foreignKey: 'groupName',
});
history.belongsTo(groups,{
  foreignKey: 'groupName',
})

const fetchurl = async (req, res) => {
    try {
      if (req.session.userId) {
        const fetchedUrl = new URL(req.body.url);
        const hostname = fetchedUrl.hostname;
        await groups.findOrCreate({
          defaults: {groupName: hostname},
          where:{groupName: hostname},
        });

        await history.findOrCreate({
          defaults:{
            groupName: hostname,
            userId: req.session.userId,
            url: req.body.url,
          },
          where:{
            userId: req.session.userId,
            url: req.body.url,
          }
        });
        //await mongod.saveFetchedUrl(req.session.userId, req.body.url, hostname,res);
        await request({
          uri: `${req.body.url}/`,
        },async (err,response,body)=>{
            const result = HTML.parse(body);
            await mongod.saveFetchedUrl(req.session.userId);
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

  const browseGroupHistory = async (req,res)=>{
    try{
      if(req.session.userId){
        const parseResult = queryToIntParser(req.query.page, req.query.perPage);
        if(!parseResult){
          res.send(400);
          return;
        }
        req.query.page = parseResult.page;
        req.query.perPage = parseResult.perPage;
        const result = await groups.findAndCountAll({
          attributes:['groupName'],
          distinct: true,
          include:[{
            
              attributes:[],
              where:{
                  userId: req.session.userId,
                  },
              model: history,
          }],
          limit: req.query.perPage,
          offset: (req.query.page - 1)*2,
          order: checkGroupOrder(req.query.order, req.query.type),
      });
      res.send(result);
      }else{
        res.sendStatus(401);
      }
    }catch(e){
      console.log(e);
      errorHandler('Unable to fetch history','browseHistory','UsersHistory',__dirname);
    }
  }




  const browseUrlHistory =async (req,res)=>{
    try {
      if (req.session.userId){
        const parseResult = queryToIntParser(req.query.page, req.query.perPage);
        if(!parseResult){
          res.send(400);
          return;
        }
        req.query.page = parseResult.page;
        req.query.perPage = parseResult.perPage;
        const result = await history.findAndCountAll({
          where : {
            userId : req.session.userId,
          },
        attributes : ['url'], 
        order : checkUrlOrder(req.query.order, req.query.type),
        limit : req.query.perPage,
        offset: req.query.page * req.query.perPage - req.query.perPage,
        }) 
        res.send(result);
      }
    }catch(e){
      console.log(e);
      errorHandler('Unable to browse url history', 'browseUrlHistory', 'UsersHistory.js', __dirname);

    }
  }

  const browseGroupedUrlHistory = async (req,res) => {
    if(req.session.userId){
      try{
        const parseResult = queryToIntParser(req.query.page, req.query.perPage);
        if(!parseResult){
          res.send(400);
          return;
        }
        req.query.page = parseResult.page;
        req.query.perPage = parseResult.perPage;
      const result = await history.findAndCountAll({
        where: {
          groupName: req.query.groupName,
          userId: req.session.userId,
        },
        attributes: ['url'],
        limit: req.query.perPage,
        offset: req.query.page * req.query.perPage - req.query.perPage,
        order: checkGroupedUrlOrder(req.query.order, req.query.type),
      });
      res.send(result);
    }catch(e){
      console.log(e);
      res.send(503);
      errorHandler('Unable to retrieve history from "history" database', 'browseGroupedUrlHistory', 'Usershistory.js', __dirname);
    }
    }else{
      res.sendStatus(401)
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
  browseGroupHistory,
  browseUrlHistory,
  browseGroupedUrlHistory,
}
