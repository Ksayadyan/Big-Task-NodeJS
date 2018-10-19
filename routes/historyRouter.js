

const {fetchurl,saveHtml,browseGroupHistory} = require('../controllers/BasicLogic/UsersHistory.js')

const configureHistoryRouter = (router) =>{
    //Saving fetched url in mongodb
router.post('/fetchurl',fetchurl);
//Saving html in mongodb
router.post('/savehtml',saveHtml);
//fetching history
router.get('/browseHistory',browseGroupHistory);
// //getting saved html
// router.post('/getSavedHtml',mongod.getSavedHtml);
console.log('history route configired');
}

module.exports = configureHistoryRouter;


