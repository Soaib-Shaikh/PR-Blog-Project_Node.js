// Edit profile form
exports.editProfileForm = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).lean();
        if (!user) return res.redirect('/login');

        res.render('pages/user/editProfile', { user });
    } catch (err) {
        console.error("Error loading edit profile form:", err);
        res.status(500).send("Server Error");
    }
};
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

// Profile page
module.exports.profilePage = async (req, res) => {
    try {
        if (!req.isAuthenticated()) return res.redirect('/login');

        const user = req.user; // Passport user
        return res.render('./pages/profile', { user });
    } catch (error) {
        console.error("Profile Page Error:", error);
        return res.redirect('/blog');
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Find current user
        const user = await User.findById(req.session.userId);
        if (!user) return res.redirect('/login');

        // Update fields
        user.username = username || user.username;
        user.email = email || user.email;

        // Update password if provided
        if (password && password.trim() !== "") {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        // Redirect back to profile
        res.redirect('/profile');
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).send("Server Error");
    }
};
