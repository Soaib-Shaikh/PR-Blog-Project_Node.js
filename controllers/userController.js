const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

// Profile Page (View Profile)
module.exports.profilePage = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        const user = req.user; // Passport user object
        return res.render('./pages/profile', { user });
    } catch (error) {
        console.error("Profile Page Error:", error);
        return res.redirect('/blog');
    }
};

// Edit Profile Form Page
module.exports.editProfileForm = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        const user = await User.findById(req.user._id).lean();
        if (!user) return res.redirect('/login');

        res.render('./pages/editUser', { user });
    } catch (err) {
        console.error("Error loading edit profile form:", err);
        res.status(500).send("Server Error");
    }
};

// Update Profile
module.exports.updateProfile = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        const { username, email, password } = req.body;

        // Find user by Passport ID
        const user = await User.findById(req.user._id);
        if (!user) return res.redirect('/login');

        // Update fields
        user.username = username || user.username;
        user.email = email || user.email;

        // Update password only if provided
        if (password && password.trim() !== "") {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        console.log("User Profile Updated.");
        res.redirect('/profile');
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).send("Server Error");
    }
};

// Delete Profile
module.exports.deleteProfile = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        const deletedUser = await User.findByIdAndDelete(req.user._id);

        if (!deletedUser) {
            console.log("User not found!");
            return res.redirect('/profile');
        }

        console.log("User deleted successfully!");

        req.logout((err) => {
            if (err) {
                console.error("Logout Error:", err);
                return res.status(500).send("Logout Failed");
            }

            req.session.destroy((err) => {
                if (err) {
                    console.error("Session Destroy Error:", err);
                    return res.status(500).send("Session Destroy Failed");
                }

                // Redirect to login page with a success query param
                return res.redirect('/login?deleted=1');
            });
        });
    } catch (err) {
        console.error("Error deleting profile:", err);
        res.status(500).send("Server Error");
    }
};