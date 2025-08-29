const express = require('express');
const homeRouter = require('./home.routes');
const postRouter = require('./post.routes');
const userRouter = require('./user.routes')
const router = express.Router();

router.use('/',homeRouter);
router.use('/posts',postRouter);
router.use('/user', userRouter);

// Also mount user profile routes directly at /profile and /profile/edit
const { isAuth } = require('../middlewares/auth');
const userController = require('../controllers/userController');
router.get('/profile', isAuth, userController.profilePage);
router.get('/profile/edit', isAuth, userController.editProfileForm);
router.post('/profile/edit', isAuth, userController.updateProfile);

module.exports = router;
