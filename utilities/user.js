

const cryptPassword = require('./cryptPassword.js');

module.exports.login = async (req,res)=>{
  try{
  console.log('signin requrest');
  let message = '';
  if(req.method === 'POST'){
    let post = req.body;
    let login = post.login;
    console.log(post,'this is post');
    let password = cryptPassword(post.password);
    let sql = `SELECT * FROM users WHERE login='${login}' and password='${password}'`;
    let user = await db.query(sql,{type: db.QueryTypes.SELECT});
    //console.log(user,'this is user');
    if(user.length){
        req.session.userId = user[0]['id'];
        console.log('User id is',user[0]['id']);
      }else{
        console.log('User is not found');
      }
    }
  }catch(e){
    console.log('error user');
  }
}
