const express=require("express");
const bodyParser=require("body-parser");


module.exports= (app) => {
    app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false,
}))

};