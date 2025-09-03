const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const Post = require('../models/Post');
const passport = require('passport');

// Default route based on authentication
module.exports.defaultRoute = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/blog');
    }
    return res.redirect('/login');
};

// Blog home page (For logged-in users)
module.exports.homePageReader = async (req, res) => {
    try {
        if (!req.isAuthenticated()) return res.redirect('/login');

        // Fetch logged-in user
        const user = req.user;

        // Get all posts
        const posts = await Post.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        return res.render('./pages/blog/blogHome', { posts, user });
    } catch (error) {
        console.error("Error in homePageReader:", error);
        return res.redirect('/login');
    }
};

// Writer home page (Logged-in user's posts only)
module.exports.homePageWriter = async (req, res) => {
    try {
        if (!req.isAuthenticated()) return res.redirect('/login');

        const user = req.user;
        const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

        return res.render('./pages/writer/writerHome', { user, posts });
    } catch (err) {
        console.log("❌ Error loading writer home:", err);
        res.status(500).send("Something went wrong");
    }
};

// Login page
module.exports.login = (req, res) => {
    return res.render('./pages/auth/login');
};

// Handle login with Passport.js
module.exports.loginHandle = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found.");
            return res.redirect('/?loginError=1');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid password.");
            return res.redirect('/?loginError=1');
        }

        // Authenticate with Passport
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                console.log("Passport Error:", err);
                return next(err);
            }
            if (!user) {
                console.log("Authentication Failed");
                return res.redirect('/?loginError=1');
            }

            req.logIn(user, (err) => {
                if (err) {
                    console.log("err.message");
                    return next(err);
                }

                console.log("Login Successful.");
                return res.redirect("/blog");
            });
        })(req, res, next);

    } catch (error) {
        console.log("Login Exception:", error);
        return res.redirect('/login');
    }
};

// Signup page
module.exports.signup = (req, res) => {
    return res.render('./pages/auth/signup');
};

// Handle signup
module.exports.signupHandle = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.redirect('/?signupError=1');
        }

        const hashed = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashed, role });

        console.log("New User Created.");
        return res.redirect('/login');
    } catch (error) {
        console.log("Signup Error:", error.message);
        return res.redirect('/signup');
    }
};

// Logout
// Logout Controller
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log("Logout Error:", err);
            return next(err);
        }

        // Session destroy
        req.session.destroy((err) => {
            if (err) {
                console.log("Session Destroy Error:", err);
                return next(err);
            }
            console.log("User Logged Out Successfully");
            return res.redirect("/login");
        });
    });
};



