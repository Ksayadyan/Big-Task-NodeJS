const express=require("express");
const bodyParser=require("body-parser");
const session = require('express-session');


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
        maxAge: 60000,
      }
  }));
};
