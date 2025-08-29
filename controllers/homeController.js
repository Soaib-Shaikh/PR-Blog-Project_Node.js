const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const Post = require('../models/Post');

// Default route based on role
module.exports.defaultRoute = (req, res) => {
    if (req.session && req.session.userId) {
        console.log('Session active');
        if (req.session.role === "admin") {
            return res.redirect('/admin');
        } else {
            return res.redirect('/blog');
        }
    } else {
        return res.redirect('/login');
    }
};

// Admin home page
module.exports.homePageAdmin = (req, res) => {
    if (req.session && req.session.userId) {
        console.log('Session active');
        if (req.session.role === "admin") {
            return res.render('index');
        } else {
            return res.redirect('/blog');
        }
    } else {
        return res.redirect('/login');
    }
};

// Blog home page (For readers)
module.exports.homePageReader = async (req, res) => {
    try {
        if (!req.session?.userId) return res.redirect('/login');

        // Find logged-in user
        const user = await User.findById(req.session.userId);

        // Get all posts (sorted by latest first)
        const posts = await Post.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        // Render blog home page with user & posts
        return res.render('./pages/blog/blogHome', {
            posts,
            user
        });

    } catch (error) {
        console.error("Error in homePageReader:", error);
        return res.redirect('/login');
    }
};


module.exports.homePageWriter = async (req, res) => {
    try {
        if (!req.session?.userId) return res.redirect('/login');

        // Logged-in user fetch
        const user = await User.findById(req.session.userId);

        // Logged-in user ke blogs fetch
        const posts = await Post.find({ author: req.session.userId }).sort({ createdAt: -1 });

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

// Handle login
module.exports.loginHandle = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            req.session.email = user.email;
            req.session.role = user.role;

            if (user.role === "admin") {
                return res.redirect('/admin');
            } else {
                return res.redirect('/blog');
            }
        } else {
            return res.redirect('/?loginError=1');
        }
    } catch (error) {
        console.log("Login Error:", error);
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
        } else {
            const hashed = await bcrypt.hash(password, 10);
            await User.create({ username, email, password: hashed, role });
            console.log("New User Created ✅");
        }
        return res.redirect('/login');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/signup');
    }
};

// Logout
module.exports.logout = (req, res) => {
    req.session.destroy(() => {
        console.log('Logout Success.');
        return res.redirect('/login');
    });
};
