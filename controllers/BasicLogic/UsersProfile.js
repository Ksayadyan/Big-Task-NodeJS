const mysql = require('sequelize');
const mongod = require('../../models/MongoDb/mongo.js')
const {Users} = require('../../models/MySQL/MySQLTableDefine.js')
const errorHandler = require('../../helpers/errorhandler.js');




//Profile Information sending
const profile = async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        res.redirect('/login');
        return;
      }
     const user= await Users.findOne(
        {where: {   
        id : userId
      },
      raw : true,
    }) 
      
      console.log('User found');
      const obj = {
        name: user.name,
        lastname: user.lastname
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
      await Users.update({
        mail : value.mail,
        name : value.name,
        lastname : value.lastname,
        birthday : value.birthday,
        phone: value.phone
      },
      {where:{id:req.session.userId}})
      
          console.log('information changed');

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

