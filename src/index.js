const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session') (session);
const passport = require('passport');

const { database } = require('./keys');
const helpers = require('./lib/helpers');
const { PORT } = require('./config')

//inicialisaciones
const app = express();
require('./lib/passport');

//MIDDLEWARES
app.use(session({
    secret: 'gusNodeMysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//GLOBALS VARIABLES
app.use((req, res, next) => {
    app.locals.success = req.flash('success');

    app.locals.user = req.user;
    next();
});

//SETTINGS
app.set('port', process.env.PORT || 1000);
app.set('views', path.join(__dirname, '/views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main.hbs',
    LayoutsDir: path.join(app.get('views'), 'layouts'),
    PartialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js')
}));
app.set('view engine', '.hbs');

// ROUTES
app.use('/links', require('./routes/liks.js'));
app.use(require('./routes/index'));
app.use(require('./routes/authentication.js'));

// PUBLIC
app.use(express.static(path.join(__dirname, '/public')));

// STARTIN THE SERVCER
app.listen(PORT, () => {
    console.log('server on port', PORT);
});