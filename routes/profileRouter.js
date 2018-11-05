
const {imageUpload,editProfile} = require('../service/BasicLogic/UsersProfile.js');
const {AuthenticateToken, AuthenticateImageToken} = require('../middleware/tokenAuthenticator.js');

const configureProfileRouter = (router)=>{
    //Handling image upload
    router.post('/imageUpload', AuthenticateToken, imageUpload);
    //Change user information
    router.post('/editprofile', AuthenticateToken, editProfile);
    
    console.log('Profile router configured');
}

module.exports = configureProfileRouter;
