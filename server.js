//Npm modules
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const mysql = require('mysql');
const session = require('express-session');
//Utility modules
const serverConfig = require('./middleware/serverConfig.js');
const authcon = require('./helpers/authcon.js');
const getSecretQuestion = require('./controllers/recovering/getSecretQuestion.js');
const recoverPassword = require('./controllers/recovering/recoverPassword.js');
const UsersHistory = require('./controllers/BasicLogic/UsersHistory.js')
const user = require('./controllers/BasicLogic/user.js');
const UsersProfile = require('./controllers/Basiclogic/UsersProfile.js')
const { db } = require('./models/MySQL/MySQLDb.js')

//Env config


//Server creation and configuration
const app = express();
serverConfig(app);

//Establish connection between server and Mysql Database


//Creating Mysql table if table  doesn't exists
//Validating properties for every column


//Global referance to mysql table
//Authenticate connection
authcon(db);



//Sending back secret question for specific user
app.post('/recoverpassword',async (req,res)=>{
    const result = await getSecretQuestion(req.body.login , db);
    res.send(result);
  });

//Attemting to change password for specific user
//Body of request contains properties below
//1.req.body.login,
//2.req.body.answer,
//3.req.body.newpassword,
app.post('/recoverpasswordattempt',async (req,res)=>{
  const result = await recoverPassword(req , db );
  res.send(result)
});

//Handling registration(every user function can be found in ./controllers/BasicLogic/user.js)
app.post('/api',user.signup);
//Handling Signin Request
app.post('/signin', user.login);
//Handling user profile rendering
app.get('/home', UsersProfile.profile);
//Handling image upload
app.post('/imageUpload',UsersProfile.imageUpload);
//Signing out specific user
app.get('/signout',user.signout);
//Saving fetched url in mongodb
app.post('/fetchurl',UsersHistory.fetchurl);
//Saving html in mongodb
app.post('/savehtml',UsersHistory.saveHtml);
//Change user information
app.post('/editprofile',UsersProfile.editProfile);


//Server starting
 app.listen(5000,()=>{
  console.log("Listening 5000");
});


module.exports={
  app,
}