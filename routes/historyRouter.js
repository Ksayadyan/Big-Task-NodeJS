

const {fetchurl,saveHtml,browseGroupHistory,browseUrlHistory,browseGroupedUrlHistory} = require('../controllers/BasicLogic/UsersHistory.js');
const {getSavedHtml, getImages, editProfilePic} = require('../models/MongoDb/mongo.js');
const {AuthenticateToken} = require('../middleware/tokenAuthenticator.js');

const configureHistoryRouter = (router) =>{
    //Saving fetched url in mongodb
router.post('/fetchurl', AuthenticateToken,fetchurl);
//Saving html in mongodb
router.post('/savehtml', AuthenticateToken, saveHtml);
//fetching history
router.get('/browseGroupHistory', AuthenticateToken, browseGroupHistory);

router.get('/browseUrlHistory', AuthenticateToken, browseUrlHistory);

router.get('/browseGroupedUrlHistory', AuthenticateToken, browseGroupedUrlHistory);
// //getting saved html
router.post('/getSavedHtml', AuthenticateToken, getSavedHtml);

router.get('/getImages', AuthenticateToken, getImages);

router.post('/editProfilePic', AuthenticateToken, editProfilePic);

console.log('history route configired');
}

module.exports = configureHistoryRouter;



