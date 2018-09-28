const express=require("express");
const bodyParser=require("body-parser");
const session = require('express-session');
const fileUpload = require('express-fileupload');

//Server full configuration
module.exports= (app) => {
    app.use(express.static(`${__dirname}/../public`));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
  extended:false,
  }));
  app.use(session({
      secret: 'cat',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 600000000000,
      }
  }));
  app.use(fileUpload());
};
