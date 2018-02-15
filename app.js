const express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  app = express(),

  //routers 
  index = require('./routes/index'),
  rMovie = require('./routes/rMovie'),
  rDirector = require('./routes/rDirector'),

  //db connection
  db = require("./helper/db")(),

  //middleware
  verifyToken=require("./middleware/verify-token"),

  //config
  config = require("./config");

  //alıp global olarak kullandık, NOT: set le bütün her yerden ulaşıma ve kullanıma açıyoruz sanırım!
  app.set("api_secret_key", config.api_secret_key); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", index);
app.use("/api",verifyToken); //verify middleware burdan aşağıdaki her türlü endpoint için geçerli
app.use("/api/movies", rMovie);
app.use("/api/directors", rDirector);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); orjinali
  //res.json({ error: { message: err.message, code: err.code } });
});

module.exports = app;
