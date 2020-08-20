const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const firebaseAdmin = require('firebase-admin');

const indexRouter = require('./routes/index');
const mainMapRouter = require('./routes/main-map')
const loginRouter = require('./routes/login')

const envDevDescription = 'development'
let env = process.env.NODE_ENV || envDevDescription
if (env === envDevDescription) {
    require('dotenv-safe').config();
}

const app = express();

const db = require('./db');

db.migrate().then(r => {
        console.log('Database was initialized!');
        configureApp();
    }
);


firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
    databaseURL: 'https://sigmapa-v2.firebaseio.com'
});

function verifyFirebaseIdToken(req, res, next) {
    let idToken = req.headers['authorization'];
    if (idToken === undefined) {
        console.log('indefinido, se ferrou');
        return res.redirect('/login');
    }

    firebaseAdmin.auth().verifyIdToken(idToken).then(function (decodedToken) {
        console.log('User esta logado socuerro');
        console.log(decodedToken);
        next();
    }).catch(function (error) {
        console.log('falso');
        return res.redirect('/login');
    });
}

function configureApp() {
    app.use(session({
        store: new pgSession({
            pool: db.client
        }),
        secret: 'shhh, top secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        }

    }));

    app.use('/index', verifyFirebaseIdToken, indexRouter);
    app.use('/main-map', verifyFirebaseIdToken, mainMapRouter);
    app.use('/login', loginRouter);

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', verifyFirebaseIdToken, function (req, res, next) {
        console.log('hello from /');
        return res.redirect('/index');
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
