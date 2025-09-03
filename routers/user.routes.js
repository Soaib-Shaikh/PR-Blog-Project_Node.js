const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuth } = require("../middlewares/auth");

// Profile Routes
router.get("/profile", isAuth, userController.profilePage);
router.get("/profile/edit", isAuth, userController.editProfileForm);
router.post("/profile/edit", isAuth, userController.updateProfile);

// ✅ POST request for Delete
router.post("/profile/delete", isAuth, userController.deleteProfile);

module.exports = router;
