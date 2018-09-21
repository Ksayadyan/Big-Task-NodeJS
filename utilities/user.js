//const cryptPassword = require('./cryptPassword.js');

module.exports.signup = async (req, res) => {
  let value = req.body;
  let password = value.password;
  try {
    db.sync()
    Users.create({
      name: value.firstName,
      lastname: value.lastName,
      login: value.login,
      password: password,
      gender: value.gender,
      birthday: value.birthday,
      question: value.question,
      answer: value.answer,
      mail: value.email,
      phone: value.telephone,
    })
    res.send("OK")
    console.log("Succesfully registered")
  } catch (e) {
    console.log("U have error");
    res.send("Duplicate")
  }
}
module.exports.login = async (req, res) => {
  try {
    console.log('signin requrest');
    let message = '';
    if (req.method === 'POST') {
      let post = req.body;
      let login = post.login;
      console.log(post, 'this is post');
      console.log(login, 'this is login');
      console.log(post.password, 'this is password');
      let password = post.password;
      let sql = `SELECT * FROM users WHERE login='${login}' and password='${password}'`;
      let user = await db.query(sql, {
        type: db.QueryTypes.SELECT
      });
      //console.log(user,'this is user');
      if (user.length) {
        req.session.userId = user[0]['id'];
        console.log('User id is', user[0]['id']);
        res.redirect('/home');
      } else {
        console.log('User is not found');
      }
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports.profile = async (req, res) => {
  try {
    let userId = req.session.userId;
    if (userId == null) {
      res.redirect('/login');
      return;
    }
    let sql = `SELECT * FROM users WHERE id='${userId}'`;
    let user = await db.query(sql, {
      type: db.QueryTypes.SELECT
    });
    console.log(user, 'this is user');
    res.send(user[0]);
  } catch (e) {
    console.log('Error while redirecting');
  }
}
