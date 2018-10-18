
const {connection,Sequelize} = require('./MySQLDb.js');

const history = connection.define('history',{
    userId : {
        type: Sequelize.INTEGER
    },

    groupName : {
        type: Sequelize.STRING,
    },
    url : {
        type : Sequelize.STRING,
    }
});

module.exports = history;