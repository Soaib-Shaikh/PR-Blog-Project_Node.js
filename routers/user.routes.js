const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuth, allowUsers } = require("../middlewares/auth");

// ✅ Profile page
router.get("/profile", isAuth, userController.profilePage);

// ✅ Edit profile form
router.get("/profile/edit", isAuth, userController.editProfileForm);

// ✅ Update profile
router.post("/profile/edit", isAuth, userController.updateProfile);

module.exports = router;
