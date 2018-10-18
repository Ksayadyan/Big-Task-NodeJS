const Sequelize = require('sequelize');
//const mysql = require('mysql2');

const connection = new Sequelize('users', 'root','11235813', {
  dialect : 'mysql',
})
connection.sync()


const defineGroupName = (connection)=>{
    const groupName = connection.define('groups',{
        groupName: {
            type :Sequelize.STRING,
            primaryKey: true,
        }
    })
    return groupName;
}


const defineHistory = (connection)=>{
    const history = connection.define('history',{
        userId : {
            type: Sequelize.INTEGER
        },
    
        groupName : {
            type: Sequelize.STRING,
            // primaryKey: true,
        },
        url : {
            type : Sequelize.STRING,
        }
    })
    return history;
}



const groupName = defineGroupName(connection);
const history = defineHistory(connection);










// groupName.hasMany(history,{
//     foreignKey: 'groupName',
//     as: 'urls',
    
// });
// history.belongsTo(groupName,{
//     foreignKey: 'groupName',
//     as: 'content'
// })

// groupName.belongsTo(history,{
//     foreignKey: 'groupName'
// });
// history.hasMany(groupName,{
//     foreignKey: 'groupName'
// })


// setTimeout( async () => {
//     const result = await groupName.findAll({
//         attributes:['groupName'],
//         include:[{
//             attributes:['url','createdAt','updatedAt'],
//             where:{
//                 userId: 49,
//             },
//             model: history,
//             as: 'urls'
//         }],
//     })
//     console.log(JSON.stringify(result,0,2));
// },3000)


const addgroup = async (groupname)=>{
    await groupName.create({
        groupName : groupname,
    })
}

const addhistory = async (groupname,url,userid)=>{
    await history.create({
        groupName : groupname,
        url : url,
        userId : userid 
    })
}








addgroup('facebook.com')
addgroup('amazon.com')
addgroup('twitter.com')
addgroup('list.am')


addhistory('facebook.com','facebook.com/boxk',16)
addhistory('facebook.com','facebook.com/56',16)
addhistory('facebook.com','facebook.com/888',16)
addhistory('facebook.com','facebook.com/9999',16)
addhistory('facebook.com','facebook.com/77777',16)
addhistory('facebook.com','facebook.com/333333',16)

addhistory('amazon.com','amazon.com/brindz',16)

addhistory('list.am','list.am/sajhdakdj',16)

addhistory('list.am','list.am/dfghjkl;',16)

addhistory('list.am','list.am/746546',16)


addhistory('facebook.com','facebook.com/shaqar',25)

addhistory('twitter.com','twitter.com/shepor',16)













// const Sequelize = require('sequelize');
// const mysql = require('mysql')

// const connection = new Sequelize('users','root','k199923',{
//     dialect: 'mysql'
// });



// const resultaperjan =async (connection)=>{

  
// await connection.sync();
//     const groups = await connection.define('groups',{
//         groupName: {
//             type: Sequelize.STRING,
//         }
//     });


//     const history = await connection.define('history',{
//         userid: {
//             type: Sequelize.INTEGER
//         },
//         url: {
//             type: Sequelize.STRING
//         },
//         groupName: {
//             type: Sequelize.STRING,
//         }   
//     });







// await groups.belongsTo(history,{
//     foreignKey: 'groupName',
// });

// await history.hasMany(groups,{
//     foreignKey: 'groupName',
// })




//         const result = await groups.findAll({
//             include: [
//                 {
//                     moduel: history
//                 }
//             ]
//         });

//     console.log(result);

    
// }



// // setTimeout((groups,history)=>{findInfo(groups,history)},3000);

// resultaperjan(connection);


// // groups.hasMany(history);
// // history.belongsTo(groups);





