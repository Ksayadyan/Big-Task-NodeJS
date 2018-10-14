const mysql = require('sequelize');
const cryptPassword = require('../../helpers/cryptPassword.js');
const mongod = require('../../models/MongoDb/mongo.js')
const {db} = require('../../models/MySQL/MySQLTableDefine.js')
const errorHandler = require('../../helpers/errorhandler.js');




//Profile Information sending
const profile = async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        res.redirect('/login');
        return;
      }
      const sql = `SELECT * FROM users WHERE id='${userId}'`;
      const user = await db.query(sql, {
        type: db.QueryTypes.SELECT
      });
      console.log('User found');
      const obj = {
        name: user[0]['name'],
        lastname: user[0]['lastname']
      }
      //Find information about specific user in mongo database
      await mongod.findAndSendUserInfo(userId, res, obj);
    } catch (e) {
      res.sendStatus(500);
      errorHandler('Unable to retrieve data from MySQL','profile','UsersProfile.js',__dirname);
    }
  }

  //Image upload handler
  const imageUpload = (req, res) => {
    if (!req.session.userId) {
      console.log('Not authentificated');
      res.sendStatus(401);
    } else {
      if (!req.files) {
        console.log('No files uploaded');
        res.sendStatus(415);
      } else {
        const image = req.files.image;
        image.mv(`./user-images/Client${req.session.userId}/${req.files.image.name}`, (err) => {
          if (err) {
            res.sendStatus(500)
            errorHandler('Unable to save uploaded image','imageUpload','UsersProfile.js',__dirname);
          }
          res.sendStatus(201)
          mongod.updateImages(req.session.userId, `../../../user-images/Client${req.session.userId}/${req.files.image.name}`)
        })
      }
    }
  }

   const editProfile = async (req, res) => {
  if (req.session.userId) {
    try {
      const value = req.body;
      const newPassword = cryptPassword(value.password);
      const sql = `UPDATE users SET
   mail = '${value.mail}',
   name = '${value.firstName}',
   lastname = '${value.lastName}',
   birthday = '${value.birthday}',
   phone = '${value.phone}' WHERE id = '${req.session.userId}'`;
      await db.query(sql).spread((results, metadata) => {
          console.log('information changed');
        });
        res.sendStatus(205);
    } catch (e) {
      res.sendStatus(503);
      errorHandler('Error happend while changing user data','editProfile','UsersProfile',__dirname);
    }
  } else {
    res.sendStatus(401);
  }
}

module.exports = {
  profile,
  imageUpload,
  editProfile,
}

//Handling user profile rendering

