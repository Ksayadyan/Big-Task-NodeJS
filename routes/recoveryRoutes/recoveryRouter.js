const {handlePasswordRecover} = require('../../service/recovering/getSecretQuestion.js');
const {handlePasswordReset} = require('../../service/recovering/recoverPassword.js');



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