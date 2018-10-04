//Npm modules
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const mysql = require('mysql');
const session = require('express-session');
const serverConfig = require('./middleware/serverConfig.js');
const authcon = require('./helpers/authcon.js');
const getSecretQuestion = require('./controllers/recovering/getSecretQuestion.js');
const recoverPassword = require('./controllers/recovering/recoverPassword.js');
const UsersHistory = require('./controllers/BasicLogic/UsersHistory.js')
const user = require('./controllers/BasicLogic/user.js');
const UsersProfile = require('./controllers/Basiclogic/UsersProfile.js')
const { db } = require('./models/MySQL/MySQLDb.js')
const router = require ('./controllers/BasicLogic/router.js')

const port=process.env.PORT || 5000 

//Server creation and configuration
const app = express();

serverConfig(app);

app.use( '/',router)

//Authenticate connection
authcon(db);



//Attemting to change password for specific user
//Body of request contains properties below
//1.req.body.login,
//2.req.body.answer,
//3.req.body.newpassword,

//Server starting
 app.listen(port,()=>{
  console.log("Listening 5000");
});


