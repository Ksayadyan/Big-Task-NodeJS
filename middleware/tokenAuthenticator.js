

const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../constants/constants.js')


const AuthenticateToken = async (req, res, next) => {
    try{
        const token = req.get('Authorization');
        console.log(token);
        await jwt.verify(token, SECRET_KEY);
        results = jwt.decode(token, {complete: true});
        req.userId = results.payload.id,
        console.log(results);
        next();
    }catch(e){
        console.log('not authenticated');
        res.send(401)
    }
}

module.exports = {
    AuthenticateToken,
}