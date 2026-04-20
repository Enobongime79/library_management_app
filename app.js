var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");

var authorsRouter = require('./routes/authors');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var borrowRouter = require('./routes/borrow');
var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'your-secret-key', // A string used to sign the session ID cookie
  resave: false,             // Prevents saving session if nothing changed
  saveUninitialized: true,   // Forces a se`ssion that is "uninitialized" to be saved to the store
  cookie: { secure: false }  // Set to true only if using HTTPS
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/books', booksRouter);
app.use('/borrow', borrowRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
