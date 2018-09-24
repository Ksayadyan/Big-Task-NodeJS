const cryptPassword = require('./cryptPassword.js')

module.exports = async (req,con)=>{
  try{
    let user = await con.query(`SELECT * FROM users WHERE login = '${req.body.login}'`, {type: con.QueryTypes.SELECT });
    if(user[0]['answer'] === req.body.answer){
      let newPassword = cryptPassword(req.body.newPassword);
      con.query(`UPDATE users SET password = '${newPassword}' WHERE login = '${user[0]['login']}'`)
      .spread((results,metadata)=>{
       console.log('Password updated');
      });
    }else{
      return 'Answer is incorrect';
    }
  }catch(e){
      console.log('There was an error while trying to update password');
      return 'Error occuered';
  }
}
