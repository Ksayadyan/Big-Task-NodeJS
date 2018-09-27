const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const mysql = require('mysql');
// const mongo=require("mongodb")
const serverConfig = require('./utilities/serverConfig.js');
const authcon = require('./utilities/authcon.js');
// const registerSafe = require('./utilities/registerSafe.js');
//const cryptPassword = require('./utilities/cryptPassword.js');
const getSecretQuestion = require('./utilities/getSecretQuestion.js');
const recoverPassword = require('./utilities/recoverPassword.js');
const user = require('./utilities/user.js');
const session = require('express-session');

let app = express();
serverConfig(app);

                                                  //ete vdrug servery problem tvec mti utilities/serverConfig.js u poxi inchor baner
let connection=new Sequelize('users','root','11235813',{ //database i anuny, workbenchit useri anuny u paroly
 dialect:'mysql',
})
global.db = connection;
//databasan avtomat sarqvuma taky bayc petqa mtnes u workbenchov dzes mi erku bane
//login y sarqes NN u UQ
//obshi sax karas sarqes NN
//id n karas sarqes PK ete problem tvec chnayac chem karcum
//packege.json y nayi tes vory petqa install ara
// karevory sequelize mysql (ete problem tvec miate mysql2 install ara)
let Users=connection.define('users',{ //table i anuny
  lastname:  {
  type:Sequelize.STRING,
  allowNull:false,
},
 login:    {
  type: Sequelize.STRING,
  allowNull: false,
  unique:true,
  validate: {
    notEmpty:true,
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
global.Users=Users;
authcon(connection);


app.get('/',(req,res)=>{
  res.sendFile('index.html');
});

app.post('/api',user.signup);




app.post('/recoverpassword',async (req,res)=>{
    console.log(req.body,'this is recover');
    let result = await getSecretQuestion(req.body.login,connection);
    res.send(result); //esi hly prcac chi sran ushadrutyun mi dardzra
  });

app.post('/recoverpasswordattempt',async (req,res)=>{
  //req.body.login,
  //req.body.answer,
  //req.body.newpassword,
  let result = await recoverPassword(req,connection);
  res.send()
})
app.post('/signin', user.login);
app.get('/home', user.profile);
app.post('/imageUpload',user.imageUpload)
app.get('/signout',user.signout)

 app.listen(5000,()=>{
  console.log("Listening 5000")
});
