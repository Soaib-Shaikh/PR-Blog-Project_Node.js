const express = require('express');
const homeRouter = express.Router();
const homeController = require('../controllers/homeController');

homeRouter.get('/',homeController.defaultRoute);

homeRouter.get('/admin',homeController.homePageAdmin);
homeRouter.get('/blog',homeController.homePageReader);
homeRouter.get('/write',homeController.homePageWriter);


homeRouter.get('/login',homeController.login);
homeRouter.post('/login',homeController.loginHandle);

homeRouter.get('/signup',homeController.signup);
homeRouter.post('/signup',homeController.signupHandle);

homeRouter.get('/logout',homeController.logout);
homeRouter.post('/logout',homeController.logout);

module.exports = homeRouter;