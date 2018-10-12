const {login,signout,signup} = require('../controllers/BasicLogic/user.js');


const configureUserRouter = (router)=>{
    router.post('/api',signup);
    router.post('/signin', login);
    router.get('/signout', signout);
    console.log('user router configured');
}

module.exports = configureUserRouter;
