//Get secret question for given login
const {db,Users} = require('../../models/MySQL/MySQLTableDefine.js')


const  getSecretQuestion = async (req, res, db)=>{
  try{
   const result = await Users.findOne(
      {where: {   
      login : req.body.login
    },
    attributes: ['question'],
        raw : true,
  })
 
  res.send(result.question)
}catch(e){
    res.sendStatus(404)
    console.log('User not found');
  }
}

const handlePasswordRecover = (req,res)=>{
  getSecretQuestion(req,res,db);
}

//Sending back secret question for specific user
module.exports = {
  handlePasswordRecover,
}
