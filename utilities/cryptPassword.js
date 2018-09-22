const crypto = require('crypto-js');

module.exports = (password)=>{
  return crypto.HmacSHA1(password, "sesuritiu").toString();
  // let encrypted = cipher.update(password, 'utf8', 'hex');
  // encrypted += cipher.final('hex');
  // return encrypted;
}
