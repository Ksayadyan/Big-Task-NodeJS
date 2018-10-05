const cryptPassword = require('../../helpers/cryptPassword.js');
const folderCreator = require('../../helpers/UsersImageFolder.js')
const mongod = require("../../models/MongoDb/mongo.js")
const ClassUser = require('../../models/MongoDb/classUserDb.js')
const {profile} = require('../BasicLogic/UsersProfile.js')
const { db,Users }  = require('../../models/MySQL/MySQLDb.js')
const router = require('./router.js');
const errorHandler = require('../../helpers/errorhandler.js');


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


    const sql = `SELECT id FROM users WHERE login = '${values.login}'`;
    //getting users id generated by mysql
    const user = await db.query(sql, {
      type: db.QueryTypes.SELECT,
    })
    try {
    folderCreator(user[0]['id']);
  }catch (e){
        res.sendStatus(507);
        errorHandler('Unable to create user folder','folderCreator','user.js',__dirname);
    }
    //Creating mongodb user object and sending to database
    if (values.gender === 'male') {
      const obj = new ClassUser(`${user[0]['id']}`, '../defaultImages/male.jpg')
      await mongod.mongo(obj);
    } else {
      const obj = new ClassUser(`${user[0]['id']}`, '../defaultImages/female.jpg')
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
      const sql = `SELECT * FROM users WHERE login='${login}' and password='${password}'`;
      const user = await db.query(sql, {
        type: db.QueryTypes.SELECT
      });
      //Generate user id
      if (user.length) {
        req.session.userId = user[0]['id'];
        console.log('User id is', user[0]['id']);
        profile(req,res)


      } else {
        console.log('User is not found');
        res.sendStatus(404)
      }
  } catch (e) {
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




router.post('/api',signup);
router.post('/signin', login);
router.get('/signout', signout);
