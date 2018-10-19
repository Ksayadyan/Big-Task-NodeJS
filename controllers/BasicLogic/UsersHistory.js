const {URL} = require('url');
const request = require('request');
const mongod = require ('../../models/MongoDb/mongo.js')
const errorHandler = require('../../helpers/errorhandler.js');
const HTML = require('html-parse-stringify');
const history = require('../../models/MySQL/MySQLDbHistoryTableDefine.js');
const groups = require('../../models/MySQL/MysqlGroupTableDefine.js');

groups.hasMany(history,{
  foreignKey: 'groupName',
  // as: 'urls',
  
});
history.belongsTo(groups,{
  foreignKey: 'groupName',
  // as: 'content'
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


  // const browseHistory = async (req,res)=>{
  //   try{
  //     if(req.session.userId){
  //       const result = await groups.findAll({
  //         attributes:['groupName'],
  //         include:[{
            
  //             attributes:['url','createdAt','updatedAt','id'],
  //             where:{
  //                 userId: req.session.userId,
  //                 },
  //             model: history,
  //             as: 'urls',
  //             //order: ['groupname','ASC'],
  //             // limit: 2,
  //             duplicating: false,
              
  //         }],
  //         //yorder:['groupName', 'ASC'],
  //         limit:3,
  //         duplicating: false,
          
  //     },);
  //     res.send(result);
  //     }else{
  //       res.sendStatus(401);
  //     }
  //   }catch(e){
  //     console.log(e);
  //     errorHandler('Unable to fetch history','browseHistory','UsersHistory',__dirname);
  //   }
  // }



  const browseGroupHistory = async (req,res)=>{
    try{
      if(req.session.userId){
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
          limit:2,
          offset: (parseInt(req.query.page) - 1)*2,
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

}
