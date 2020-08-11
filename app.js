const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const firebaseAdmin = require('firebase-admin');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mainMapRouter = require('./routes/main-map')
const loginRouter = require('./routes/login')

const envDevDescription = 'development'
let env = process.env.NODE_ENV || envDevDescription
if (env === envDevDescription) {
    require('dotenv-safe').config();
}

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    databaseURL: 'https://sigmapa-v2.firebaseio.com'
});

function verifyIdToken(idToken) {
    firebaseAdmin.auth().verifyIdToken(idToken).then(function (decodedToken) {
        console.log(decodedToken);
    }).catch(function (error) {
        console.log(error);
    });
}


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main-map', mainMapRouter);
app.use('/login', loginRouter);


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
