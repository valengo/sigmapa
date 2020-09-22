const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const mainMapRouter = require('./routes/main-map');
const loginRouter = require('./routes/login');

// TODO proper use it
const appDependencies = require('./configuration/project-dependencies');
const defaultValues = require('./configuration/default-values');

const app = express();


appDependencies.DatabaseService.makeMigration()
    .then(() => {
            console.log('Database was initialized!');
            appDependencies.MapRepository.getOneById(1).then((map) => {
                console.log(map);
            });
            configureApp();
        }
    ).catch(function (error) {
    console.log(error);
});

function verifyFirebaseIdToken(req, res, next) {
    if (req.session.email) {
        return next();
    }

    let idToken = req.headers['authorization'];
    if (idToken === undefined) {
        return res.redirect('/login');
    }
}

function isAdminLoggedIn(req, res, next) {

}

function isUserLoggedIn(req, res, next) {

}

function configureApp() {
    app.use(session({
        store: new pgSession({
            pool: appDependencies.DatabaseService.pool
        }),
        secret: 'shhh, top secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        }

    }));

    app.use('/index', verifyFirebaseIdToken, indexRouter);
    app.use('/main-map', verifyFirebaseIdToken, mainMapRouter(appDependencies, defaultValues));
    app.use('/login', loginRouter(appDependencies));

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', verifyFirebaseIdToken, function (req, res, next) {
        return res.redirect('/index');
    });

    app.get('/logout', verifyFirebaseIdToken, function (req, res, next) {
        req.session.destroy();
        res.redirect('/');
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

}

module.exports = app;
