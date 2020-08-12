const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const firebaseAdmin = require('firebase-admin');

const indexRouter = require('./routes/index');
const mainMapRouter = require('./routes/main-map')
const loginRouter = require('./routes/login')

const db = require('./db')

const envDevDescription = 'development'
let env = process.env.NODE_ENV || envDevDescription
if (env === envDevDescription) {
    require('dotenv-safe').config();
}
console.log(process.env.DATABASE_URL)
db.query('SELECT * FROM users');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
    databaseURL: 'https://sigmapa-v2.firebaseio.com'
});

function verifyIdToken(req, res, next) {
    let idToken = req.headers['authorization'];
    if (idToken === undefined) {
        console.log('indefinido, se ferrou');
        return res.redirect('/login');
    }

    firebaseAdmin.auth().verifyIdToken(idToken).then(function (decodedToken) {
        console.log('User esta logado socuerro');
        next();
    }).catch(function (error) {
        console.log('falso');
        return res.redirect('/login');
    });
}


const app = express();

app.use('/index', verifyIdToken, indexRouter);
app.use('/main-map', verifyIdToken, mainMapRouter);
app.use('/login', loginRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', verifyIdToken, function (req, res, next) {
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

module.exports = app;
