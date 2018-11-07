//Module for updating users password(recover)

const cryptPassword = require('../../helpers/cryptPassword.js');
const {db,Users} = require('../../models/MySQL/MySQLTableDefine.js');
const errorHandler = require('../../helpers/errorhandler.js');


const recoverPassword = async (req,db,res)=>{
  try{
    const result = await Users.findOne(
    {
      where: {   
        login : req.body.login
      },
      attributes : ['answer'],
      raw : true,
    })
       if(result.answer === req.body.answer){
        const newPassword = cryptPassword(req.body.newPassword);
        await Users.update(
          {password : newPassword},
          {where:{login : req.body.login}},
          );   
        res.json(205);
        console.log('Password has been reset');
    }else{
      res.json(409);
      console.log('Answer is incorrect');
    }
  }catch(e){
      res.json(501);
      errorHandler('Error happend while updating user data','recoverPassword','recoverPassword.js',__dirname);
    
  }
}

const handlePasswordReset = (req, res)=>{
  recoverPassword(req, db, res)
}

module.exports = {
  handlePasswordReset,
}
