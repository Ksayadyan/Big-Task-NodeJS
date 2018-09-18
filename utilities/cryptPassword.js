const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'securety');

module.exports = (password)=>{
  let encrypted = cipher.update(password.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
