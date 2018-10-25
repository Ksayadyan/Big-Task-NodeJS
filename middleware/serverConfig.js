const express=require("express");
const bodyParser=require("body-parser");
const fileUpload = require('express-fileupload');
const router = require('../routes/router.js');

//Server full configuration
module.exports = (app) => {
    app.use(express.static(`${__dirname}/../public`));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended:false,
    }));
  app.use(fileUpload());
  app.use('/',router);
};
