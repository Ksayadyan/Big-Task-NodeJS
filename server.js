const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const mysql = require('mysql');
const serverConfig = require('./utilities/serverConfig.js');
const authcon = require('./utilities/authcon.js');
const registerSafe = require('./utilities/registerSafe.js');
//const cryptPassword = require('./utilities/cryptPassword.js');
const getSecretQuestion = require('./utilities/getSecretQuestion.js');
const recoverPassword = require('./utilities/recoverPassword.js');
const user = require('./utilities/user.js');
const session = require('express-session');

let app = express();
serverConfig(app);

                                                  //ete vdrug servery problem tvec mti utilities/serverConfig.js u poxi inchor baner
let connection=new Sequelize("users","root","k199923",{ //database i anuny, workbenchit useri anuny u paroly
 dialect:"mysql",
})
global.db = connection;
//databasan avtomat sarqvuma taky bayc petqa mtnes u workbenchov dzes mi erku bane
//login y sarqes NN u UQ
//obshi sax karas sarqes NN
//id n karas sarqes PK ete problem tvec chnayac chem karcum
//packege.json y nayi tes vory petqa install ara
// karevory sequelize mysql (ete problem tvec miate mysql2 install ara)
let Users=connection.define("users",{ //table i anuny
 lastname: Sequelize.STRING,
 login:    Sequelize.STRING,
 name:     Sequelize.STRING,
 password: Sequelize.STRING,
 gender:   Sequelize.STRING,
 birthday: Sequelize.STRING,
 question: Sequelize.STRING,
 answer:   Sequelize.STRING,
 mail:     Sequelize.STRING,
 phone:    Sequelize.STRING,
})

authcon(connection);


app.get('/',(req,res)=>{
  res.sendFile('index.html');
});

app.post('/api',(req,res)=>{
  console.log("Got register request");
  registerSafe(req,res,connection,Users)
})


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

 app.listen(5000,()=>{
  console.log("Listening 5000")
});
