
const {profile,imageUpload,editProfile} = require('../controllers/BasicLogic/UsersProfile.js');

const configureProfileRouter = (router)=>{
    router.get('/home', profile);
//Handling image upload
router.post('/imageUpload',imageUpload);
//Change user information
router.post('/editprofile',editProfile);
console.log('profile router configured');
}

module.exports = configureProfileRouter;
