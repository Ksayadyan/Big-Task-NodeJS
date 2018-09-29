const mysql = require('sequelize');
const cryptPassword = require('./cryptPassword.js');

module.exports = async (req, res) => {
  if (req.session.userId) {
    try {
      let value = req.body;
      let newPassword = cryptPassword(value.password);
      let sql = `UPDATE users SET
      mail = '${value.mail}',
   name = '${value.firstName}',
   lastname = '${value.lastName}',
   birthday = '${value.birthday}',
   phone = '${value.phone}' WHERE id = '${req.session.userId}'`;
      await db.query(sql).spread((results, metadata) => {
          console.log('information changed');
        });
        res.send('information changed');
    } catch (e) {
      console.log('Error happend while changing user data');
    }
  } else {
    res.send('Not authorized');
  }
}
