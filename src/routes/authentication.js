const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isloggerIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn,(req, res) => {
    res.render('auth/singup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect:'/profile',
        failuRedirect: '/signup'
    }));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/singin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.singin', {
        successRedirect: '/profile',
        failureRedirect: '/signun'
    })(req, res, next);
});

router.get('/profile', isloggerIn, (req, res) => {
    res.render('profile');
})

router.get('/logout',(req, res) => {
    req.logout((err) =>{
        return res.redirect('/signin');
    });
});

module.exports = router;