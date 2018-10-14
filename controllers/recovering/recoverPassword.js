//Module for updating users password(recover)

const cryptPassword = require('../../helpers/cryptPassword.js');
const {db} = require('../../models/MySQL/MySQLTableDefine.js');
const errorHandler = require('../../helpers/errorhandler.js');


const recoverPassword = async (req,db,res)=>{
  try{
    const user = await db.query(`SELECT answer FROM users WHERE login = '${req.body.login}'`, {type: db.QueryTypes.SELECT });
    if(user[0]['answer'] === req.body.answer){
      const newPassword = cryptPassword(req.body.newPassword);
      await db.query(`UPDATE users SET password = '${newPassword}' WHERE login = '${req.body.login}'`)
      .spread((results,metadata)=>{
       console.log('Password updated');
      });
      res.sendStatus(205);
      console.log('Password has been reset');
    }else{
      res.sendStatus(409);
      console.log('Answer is incorrect');
    }
  }catch(e){
      res.sendStatus(501);
      errorHandler('Error happend while updating user data','recoverPassword','recoverPassword.js',__dirname);

  }
}

const handlePasswordReset = (req, res)=>{
  recoverPassword(req, db, res)
}

module.exports = {
  handlePasswordReset,
}
