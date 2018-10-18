const {connection,Sequelize} =require('./MySQLDB.js')


const groups = connection.define('groups',{
    groupName:{
        type:Sequelize.STRING,
        primaryKey: true,
    }
});

module.exports = groups;

