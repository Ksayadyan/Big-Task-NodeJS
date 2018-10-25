const {URL} = require('url');
const request = require('request');
const mongod = require ('../../models/MongoDb/mongo.js');
const errorHandler = require('../../helpers/errorhandler.js');
const HTML = require('html-parse-stringify');
const history = require('../../models/MySQL/MySQLDbHistoryTableDefine.js');
const groups = require('../../models/MySQL/MysqlGroupTableDefine.js');
const queryToIntParser = require('../../helpers/queryToIntParser.js');
const {checkGroupedUrlOrder,
       checkGroupOrder,
       checkUrlOrder,} = require('../../helpers/MysqlOrderChecker.js');


//Joining history and groups tables       
groups.hasMany(history,{
  foreignKey: 'groupName',
});
history.belongsTo(groups,{
  foreignKey: 'groupName',
})


//getting html, parsing html, saving url in Mysql database
const fetchurl = async (req, res) => {
    try {
        const fetchedUrl = new URL(req.body.url);
        const hostname = fetchedUrl.hostname;
        await groups.findOrCreate({
          defaults: {groupName: hostname},
          where:{groupName: hostname},
        });

        await history.findOrCreate({
          defaults:{
            groupName: hostname,
            userId: req.userId,
            url: req.body.url,
          },
          where:{
            userId: req.userId,
            url: req.body.url,
          }
        });

        await request({
          uri: `${req.body.url}/`,
        },async (err,response,body)=>{
          if(err){
            res.sendStatus(400);
            return;
          }
            const result = HTML.parse(body);
            await mongod.saveFetchedUrl(req.userId);
            res.send(result);
        });
    } catch (e) {
      res.sendStatus(507);
      console.log(e);
      errorHandler('Error occured while trying to save fetched url','fetchurl','UsersHistory.js',__dirname);
    }
  }

  //Saveing fetched url's html in mogodb

  const saveHtml = async (req, res) => {
    try {
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
            await mongod.saveHtml(req.userId, hostname, req.body.url, body);
          }catch(e){
            errorHandler('Error occured while saving html','saveHtml','UsersHistory',__dirname);
          }
        });
        res.sendStatus(201);
    } catch (e) {
      res.sendStatus(507);
      errorHandler('Unknown error while saving html','saveHtml','UsersHistory',__dirname);
    }
  }


  //browse users history as groups
  const browseGroupHistory = async (req,res)=>{
    try{
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
                  userId: req.userId,
                  },
              model: history,
          }],
          limit: req.query.perPage,
          offset: (req.query.page - 1)*2,
          order: checkGroupOrder(req.query.order, req.query.type),
      });
      res.send(result);
    }catch(e){
      console.log(e);
      errorHandler('Unable to fetch history','browseHistory','UsersHistory',__dirname);
    }
  }



 //browse user history as urls
  const browseUrlHistory =async (req,res)=>{
    try {
      
        const parseResult = queryToIntParser(req.query.page, req.query.perPage);
        if(!parseResult){
          res.send(400);
          return;
        }
        req.query.page = parseResult.page;
        req.query.perPage = parseResult.perPage;
        const result = await history.findAndCountAll({
          where : {
            userId : req.userId,
          },
        attributes : ['url', 'createdAt', 'updatedAt'], 
        order : checkUrlOrder(req.query.order, req.query.type),
        limit : req.query.perPage,
        offset: req.query.page * req.query.perPage - req.query.perPage,
        }) 
        res.send(result);
      
    }catch(e){
      console.log(e);
      errorHandler('Unable to browse url history', 'browseUrlHistory', 'UsersHistory.js', __dirname);

    }
  }


  //browse users history grouped by url for specific group
  const browseGroupedUrlHistory = async (req,res) => {
      try{
        const parseResult = queryToIntParser(req.query.page, req.query.perPage);
        if(!parseResult){
          res.sendStatus(400);
          return;
        }
        req.query.page = parseResult.page;
        req.query.perPage = parseResult.perPage;
      const result = await history.findAndCountAll({
        where: {
          groupName: req.query.groupName,
          userId: req.userId,
        },
        attributes: ['url', 'createdAt'],
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
  }

module.exports = {
  fetchurl,
  saveHtml,
  browseGroupHistory,
  browseUrlHistory,
  browseGroupedUrlHistory,
}
