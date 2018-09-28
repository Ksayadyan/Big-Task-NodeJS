//Npm modules
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const mysql = require('mysql');
const session = require('express-session');
//Utility modules
const serverConfig = require('./utilities/serverConfig.js');
const authcon = require('./utilities/authcon.js');
const getSecretQuestion = require('./utilities/getSecretQuestion.js');
const recoverPassword = require('./utilities/recoverPassword.js');
const user = require('./utilities/user.js');

//Server creation and configuration
let app = express();
serverConfig(app);

//Establish connection between server and Mysql Database
let connection=new Sequelize('users','root','k199923',{
 dialect:'mysql',
})
//Global referance to Mysql Connection
global.db = connection;

//Creating Mysql table if table  doesn't exists
//Validating properties for every column
let Users=connection.define('users',{
  lastname:  {
  type:Sequelize.STRING,   //type String
  allowNull:false,         //Value can't be null
},
 login:    {
  type: Sequelize.STRING,
  allowNull: false,
  unique:true,             //This value is unique in whole table
  validate: {
    notEmpty:true,         //Additional validation(Filed can't be empty)
    }
 },
 name:     {
   type:Sequelize.STRING,
   allowNull:false,
   validate: {
    notEmpty:true,
    }
},
 password: {
  type:Sequelize.STRING,
  allowNull:false,
  validate: {
    notEmpty:true,
    }
},
 gender:    {
  type:Sequelize.STRING,
  allowNull:false,
  validate: {
    notEmpty:true,
    }
},
 birthday: {
  type:Sequelize.STRING,
  allowNull:false,
  validate: {
    notEmpty:true,
    }
},
 question:  {
  type:Sequelize.STRING,
  allowNull:false,
},
 answer:    {
  type:Sequelize.STRING,
  allowNull:false,
  validate: {
    notEmpty:true,
    }
},
 mail:      {
  type:Sequelize.STRING,
  allowNull:false,
  validate: {
    notEmpty:true,
    }
},
 phone:     {
  type:Sequelize.STRING,
  allowNull:false,
  validate: {
    notEmpty:true,
    }
},
})

//Global referance to mysql table
global.Users=Users;
//Authenticate connection
authcon(connection);

//Handling registration(every user function can be found in utilities/users.js)
app.post('/api',user.signup);



//Sending back secret question for specific user
app.post('/recoverpassword',async (req,res)=>{
    let result = await getSecretQuestion(req.body.login,connection);
    res.send(result);
  });

//Attemting to change password for specific user
//Body of request contains properties below
//1.req.body.login,
//2.req.body.answer,
//3.req.body.newpassword,
app.post('/recoverpasswordattempt',async (req,res)=>{
  let result = await recoverPassword(req,connection);
  res.send(result)
});

//Handling Signin Request
app.post('/signin', user.login);
//Handling user profile rendering
app.get('/home', user.profile);
//Handling image upload
app.post('/imageUpload',user.imageUpload);
//Signing out specific user
app.get('/signout',user.signout);
//Saving fetched url in mongodb
app.post('/fetchurl',user.fetchurl);
//Saving html in mongodb
app.post('/savehtml',user.saveHtml)


//Server starting
 app.listen(5000,()=>{
  console.log("Listening 5000");
});
