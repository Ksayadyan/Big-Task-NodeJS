<<<<<<< HEAD
const crypto = require('crypto-js');

module.exports = (password)=>{
  return crypto.HmacSHA1(password, "sesuritiu").toString();
  // let encrypted = cipher.update(password, 'utf8', 'hex');
  // encrypted += cipher.final('hex');
  // return encrypted;
=======
const crypto = require('crypto');
let cipher = crypto.createCipher('aes192', 'securety');

module.exports = (password)=>{
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
>>>>>>> 34cf540af9fecbba4ac0beca820c61f6a7f05e01
}
