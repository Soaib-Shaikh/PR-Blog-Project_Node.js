// ✅ Check if user is authenticated
exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect('/login');
};

// ✅ Allow only normal users (no admin check now)
exports.allowUsers = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    if (req.user.role === 'user') return next();
    return res.redirect('/login');
};
