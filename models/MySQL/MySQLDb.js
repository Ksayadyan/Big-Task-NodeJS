const Sequelize = require('sequelize');
const mysql = require('mysql');
const {MYSQL_DATABASE_NAME, MYSQL_USER_NAME, MYSQL_PASSWORD} = require('../../constants/constants.js');


const connection=new Sequelize(MYSQL_DATABASE_NAME, MYSQL_USER_NAME, MYSQL_PASSWORD,{
  dialect:'mysql',
 })
 //Global referance to Mysql Connection
 const db = connection

const Users=connection.define('users',{
    lastname:  {
    type:Sequelize.STRING,   //type String
    allowNull:false,         //Value can't be null
    validate :{
      notEmpty: true,
      isAlpha:true,
    }
  },
   login:    {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,             //This value is unique in whole table
    validate: {
      notEmpty:true,
      min : 5,      //Additional validation(Field can't be empty)
      }
   },
   name:     {
     type:Sequelize.STRING,
     allowNull:false,
     validate: {
      notEmpty:true,
      isAlpha:true,
      min : 3
      }
  },
   password: {
    type:Sequelize.STRING,
    allowNull:false,
    validate: {
      notEmpty:true,
      min : 6
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
    type:Sequelize.TEXT,
    allowNull:false,
    validate: {
      notEmpty:true,
      }
  },
   answer:    {
    type:Sequelize.TEXT,
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
      isEmail : true,
      }
  },
   phone:     {
    type:Sequelize.STRING,
    allowNull:false,
    validate: {
      notEmpty:true,
      isNumeric:true,
      }
  },
  })

  module.exports={
    Users,db
  }
