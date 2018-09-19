

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
        res.redirect('/home');
      }else{
        console.log('User is not found');
      }
    }
  }catch(e){
    console.log('error user');
  }
}

module.exports.profile = async (req,res)=>{
  try{
    let userId = req.session.userId;
    if(userId == null){
      res.redirect('/login');
      return;
    }
    let sql = `SELECT * FROM users WHERE id='${userId}'`;
    let user = await db.query(sql,{type: db.QueryTypes.SELECT});
    console.log(user,'this is user');
    res.send(user[0]);
  }catch(e){
    console.log('Error while redirecting');
  }
}
