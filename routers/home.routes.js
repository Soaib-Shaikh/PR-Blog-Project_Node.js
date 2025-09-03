const express = require('express');
const homeRouter = express.Router();
const homeController = require('../controllers/homeController');
const { isAuth } = require('../middlewares/auth');

homeRouter.get('/', homeController.defaultRoute);

homeRouter.get('/blog', isAuth, homeController.homePageReader);
homeRouter.get('/write', isAuth, homeController.homePageWriter);

homeRouter.get('/login', homeController.login);
homeRouter.post('/login', homeController.loginHandle);

homeRouter.get('/signup', homeController.signup);
homeRouter.post('/signup', homeController.signupHandle);

homeRouter.post('/logout', homeController.logout);

module.exports = homeRouter;
