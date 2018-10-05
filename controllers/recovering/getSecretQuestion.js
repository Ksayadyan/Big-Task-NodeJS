//Get secret question for given login
const router = require('../BasicLogic/router.js')
const {db} = require('../../models/MySQL/MySQLDb.js')


const  getSecretQuestion = async (login,db)=>{
  try{
  const query = `SELECT question FROM users WHERE login = '${login}'`; //SQL query
  const result = await db.query(query, { type: db.QueryTypes.SELECT }); //Result after SQL query
  return result[0]['question'];
}catch(e){
    res.sendStatus(404)
    console.log('User not found');
  }
}

//Sending back secret question for specific user
router.post('/recoverpassword',async (req,res)=>{
  const result = await getSecretQuestion(req.body.login , db);
  res.status(200);
  res.send(result)
});
