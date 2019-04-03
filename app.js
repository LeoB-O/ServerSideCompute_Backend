var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jwt-express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var userRouter = require('./routes/user');

var credentials = require('./credentials');

var app = express();

mongoose.connect(credentials.mongo.development.connectionString);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwt.init(credentials.jwt.development.secret, credentials.jwt.development.options));
app.use(cors({credentials: true, origin: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', jwt.active(), apiRouter);
app.use('/user', jwt.active(), userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (err.name === 'JWTExpressError') {
        res.send({code: 50014, message: err, data: {}});
        return;
    }

    // render the error page
    res.status(err.status || 200);
    res.send({code: 50000, message: err.message, data: {}});
    //   res.render('error');
});

module.exports = app;
