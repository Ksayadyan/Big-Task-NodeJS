

const {fetchurl,saveHtml,browseGroupHistory,browseUrlHistory,browseGroupedUrlHistory} = require('../service/BasicLogic/UsersHistory.js');
const {getSavedHtml, getImages, editProfilePic} = require('../models/MongoDb/mongo.js');
const {AuthenticateToken} = require('../middleware/tokenAuthenticator.js');

const configureHistoryRouter = (router) =>{
    //Saving fetched url in mongodb
    router.post('/fetchurl', AuthenticateToken,fetchurl);
    //Saving html in mongodb
    router.post('/savehtml', AuthenticateToken, saveHtml);
    //fetching history as groups
    router.get('/browseGroupHistory', AuthenticateToken, browseGroupHistory);
    //fetching history as Urls
    router.get('/browseUrlHistory', AuthenticateToken, browseUrlHistory);
    //fetching history by groupname
    router.get('/browseGroupedUrlHistory', AuthenticateToken, browseGroupedUrlHistory);
    //getting saved html
    router.post('/getSavedHtml', AuthenticateToken, getSavedHtml);
    //getting uploaded images
    router.get('/getImages', AuthenticateToken, getImages);
    //changing profile picture
    router.post('/editProfilePic', AuthenticateToken, editProfilePic);

    console.log('History route configired');
}

module.exports = configureHistoryRouter;



