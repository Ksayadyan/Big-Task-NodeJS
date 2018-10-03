//Module for updating users password(recover)

const cryptPassword = require('../../helpers/cryptPassword.js')

module.exports = async (req,con)=>{
  try{
    const user = await con.query(`SELECT answer FROM users WHERE login = '${req.body.login}'`, {type: con.QueryTypes.SELECT });
    if(user[0]['answer'] === req.body.answer){
      const newPassword = cryptPassword(req.body.newPassword);
      await con.query(`UPDATE users SET password = '${newPassword}' WHERE login = '${req.body.login}'`)
      .spread((results,metadata)=>{
       console.log('Password updated');
      });
      return 'Password has been reset'
    }else{
      return 'Answer is incorrect';
    }
  }catch(e){
      console.log('There was an error while trying to update password');
      return 'Error occuered';
  }
}
