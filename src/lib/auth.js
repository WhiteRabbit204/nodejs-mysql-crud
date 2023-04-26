module.exports = {
    isloggerIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        };
        res.redirect('/signin');
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    }
};