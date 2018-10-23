

const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../constants/constants.js');

const generateToken = async (payload) => {
    const token = await jwt.sign(payload, SECRET_KEY);
    console.log(token);
    return token;
}

module.exports = {
    generateToken,
}