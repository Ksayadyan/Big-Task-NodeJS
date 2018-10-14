//Get secret question for given login
const {db} = require('../../models/MySQL/MySQLTableDefine.js')


const  getSecretQuestion = async (req, res, db)=>{
  try{
  const query = `SELECT question FROM users WHERE login = '${req.body.login}'`; //SQL query
  const result = await db.query(query, { type: db.QueryTypes.SELECT }); //Result after SQL query
  res.send(result[0]['question'])
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
