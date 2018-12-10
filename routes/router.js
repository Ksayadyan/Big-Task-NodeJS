
const router = require('express').Router();
const configureHistoryRouter = require('./historyRouter.js');
const configureProfileRouter = require('./profileRouter.js');
const configureUserRouter = require('./userRouter.js');
const {configurePasswordRecover,configurePasswordReset} = require('./recoveryRoutes/recoveryRouter.js');


configurePasswordRecover(router);
configurePasswordReset(router);
configureHistoryRouter(router);
configureProfileRouter(router);
configureUserRouter(router); 


module.exports = router;
