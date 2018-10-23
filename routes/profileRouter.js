
const {profile,imageUpload,editProfile} = require('../controllers/BasicLogic/UsersProfile.js');
const {AuthenticateToken} = require('../middleware/tokenAuthenticator.js');

const configureProfileRouter = (router)=>{
//Handling image upload
router.post('/imageUpload', AuthenticateToken, imageUpload);
//Change user information
router.post('/editprofile', AuthenticateToken, editProfile);

console.log('profile router configured');
}

module.exports = configureProfileRouter;
