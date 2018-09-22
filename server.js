const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const mysql = require('mysql');
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
<<<<<<< HEAD
let connection=new Sequelize('users','root','11235813',{ //database i anuny, workbenchit useri anuny u paroly
=======
<<<<<<< HEAD
let connection=new Sequelize('users','root','11235813',{ //database i anuny, workbenchit useri anuny u paroly
=======
let connection=new Sequelize('users','root','k199923',{ //database i anuny, workbenchit useri anuny u paroly
>>>>>>> 34cf540af9fecbba4ac0beca820c61f6a7f05e01
>>>>>>> cd9616895eb8be8dc9b9c7e66d657d40423e1bb1
 dialect:'mysql',
})
global.db = connection;
//databasan avtomat sarqvuma taky bayc petqa mtnes u workbenchov dzes mi erku bane
//login y sarqes NN u UQ
//obshi sax karas sarqes NN
//id n karas sarqes PK ete problem tvec chnayac chem karcum
//packege.json y nayi tes vory petqa install ara
// karevory sequelize mysql (ete problem tvec miate mysql2 install ara)
<<<<<<< HEAD
let Users=connection.define('users',{ //table i anuny
=======
let Users=connection.define('uniqelogin',{ //table i anuny
>>>>>>> cd9616895eb8be8dc9b9c7e66d657d40423e1bb1
 lastname:  {
  type:Sequelize.STRING,
  allowNull:false,
},
 login:    {
  type: Sequelize.STRING,
  allowNull: false,
  unique:true,
 },
 name:     {
   type:Sequelize.STRING,
   allowNull:false,
},
 password: {
  type:Sequelize.STRING,
  allowNull:false,
},
 gender:    {
  type:Sequelize.STRING,
  allowNull:false,
},
 birthday: {
  type:Sequelize.STRING,
  allowNull:false,
},
 question:  {
  type:Sequelize.STRING,
  allowNull:false,
},
 answer:    {
  type:Sequelize.STRING,
  allowNull:false,
},
 mail:      {
  type:Sequelize.STRING,
  allowNull:false,
},
 phone:     {
  type:Sequelize.STRING,
  allowNull:false,
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

 app.listen(5000,()=>{
  console.log("Listening 5000")
});
