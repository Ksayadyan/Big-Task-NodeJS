const crypto = require('crypto');
let cipher = crypto.createCipher('aes192', 'securety');

module.exports = (password)=>{
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
