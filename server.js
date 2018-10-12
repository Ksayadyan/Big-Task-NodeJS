//Npm modules
const express = require('express');
//Configuration modules
const serverConfig = require('./middleware/serverConfig.js');
const authenticateMysqlConnection = require('./helpers/authenticateMysqlConnection.js');
const { db } = require('./models/MySQL/MySQLDb.js');

const port = process.env.PORT || 5000 

//Server creation and configuration
const app = express();
serverConfig(app);

//Authenticate connection
authenticateMysqlConnection(db);

//Server starting
 app.listen(port,()=>{
  console.log("Listening 5000");
});


