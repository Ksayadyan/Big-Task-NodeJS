const cryptPassword = require('../../helpers/cryptPassword.js');
const folderCreator = require('../../helpers/UsersImageFolder.js')
const mongod = require("../../models/MongoDb/mongo.js")
const ClassUser = require('../../models/MongoDb/classUserDb.js')
const {profile} = require('../BasicLogic/UsersProfile.js')
const { db,Users }  = require('../../models/MySQL/MySQLTableDefine.js')
const errorHandler = require('../../helpers/errorhandler.js');
const {generateToken} = require('../../middleware/tokenGenerator.js');


const signup = async (req, res) => {
  const values = req.body;
  try {
    const password = cryptPassword(values.password);
    db.sync();
    //Creating user row in mysql database
    await Users.create({
      name: values.firstName,
      lastname: values.lastName,
      login: values.login,
      password: password,
      gender: values.gender,
      birthday: values.birthday,
      question: values.question,
      answer: values.answer,
      mail: values.email,
      phone: values.phone,

    })

    const user = await Users.findOne(
      {where: {   
      login : values.login
    },
    raw : true,
  })
    console.log(user,'das ist user')
     try {
    folderCreator(user['id']);
  }catch (e){
        res.sendStatus(507);
        errorHandler('Unable to create user folder','folderCreator','user.js',__dirname);
    }
    //Creating mongodb user object and sending to database
    if (values.gender === 'male') {
      const obj = new ClassUser(`${user['id']}`, '../defaultImages/male.jpg')
      await mongod.mongo(obj);
    } else {
      const obj = new ClassUser(`${user['id']}`, '../defaultImages/female.jpg')
      await mongod.mongo(obj);
    }
    console.log("Succesfully registered");
    res.sendStatus(201)
  } catch (e) {
    console.log(`User with login "${values.login}" exists`);
    res.sendStatus(409)
  }
}


const login = async (req, res) => {
  try {
    console.log('signin requrest');
      const post = req.body;
      const login = post.login;
      const password = cryptPassword(post.password);
      const user =  await Users.findOne(
        {where: {   
        login : login,
        password : password,
      },
      raw : true,
    })
      
      //Generate user id
      if (user) {
        const token = await generateToken(user);
        console.log('User id is', user.id);
        profile(req, res, token, user.id);


      } else {
        console.log('User is not found');
        res.sendStatus(401);
      }
  } catch (e) {
    console.log(e);
    errorHandler('Unable to retrieve data from MySQL','login','user.js',__dirname);
    res.sendStatus(503);
  }
}




//Signing out specific user
const signout = async (req, res) => {
  if (req.session.userId) {
    req.session.destroy();
    res.sendStatus(200);
  } else {
    res.sendStatus(401)
  }
}


module.exports = {
  signup,
  signout,
  login,
}

