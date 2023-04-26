const passport = require('passport');
const LocalStrategy = require('passport-local');

const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.singin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);

    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.mathPassword(password, user.password)

        if (validPassword) {
            done(null, user, console.log('Welcolme' + user.username));
        }else{
            done(null, false, console.log('Incorret Password'));
        }
    }else{
        return done(null, false, console.log('The Username is Undefaidel'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=> {
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encrypPassword(password)
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);    
}));

passport.serializeUser((user, done) =>{
     done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});