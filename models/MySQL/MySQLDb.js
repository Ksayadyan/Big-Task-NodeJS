const Sequelize = require('sequelize');
const mysql = require('mysql');
require('dotenv').config();

const connection=new Sequelize('users','root',`${process.env.DB_PASSWORD}`,{
  dialect:'mysql',
 })
 //Global referance to Mysql Connection
 const db = connection;

const Users=connection.define('users',{
    lastname:  {
    type:Sequelize.STRING,   //type String
    allowNull:false,         //Value can't be null
  },
   login:    {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,             //This value is unique in whole table
    validate: {
      notEmpty:true,         //Additional validation(Field can't be empty)
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

  module.exports={
    Users,db
  }





  