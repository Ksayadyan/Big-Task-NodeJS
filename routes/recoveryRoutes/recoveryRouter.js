const {handlePasswordRecover} = require('../../controllers/recovering/getSecretQuestion.js');
const {handlePasswordReset} = require('../../controllers/recovering/recoverPassword.js');



const configurePasswordRecover = (router)=>{
    router.post('/recoverpassword',handlePasswordRecover);
    console.log('Password recover configured');
}
const configurePasswordReset = (router)=>{
    router.post('/recoverpasswordattempt',handlePasswordReset);
    console.log('Password resetting configured');
}


module.exports = {
    configurePasswordRecover,
    configurePasswordReset,
}