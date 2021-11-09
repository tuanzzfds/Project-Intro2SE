var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//list song
const dboperator = require('./dboperator')

var homePageRouter = require('./routes/home_page');
var usersRouter = require('./routes/users');
var libraryRouter = require('./routes/library')
var accountRouter = require('./routes/account')
var playmusicRouter = require('./routes/playmusic')
var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homePageRouter);
app.use('/users', usersRouter);
app.use('/library', libraryRouter);
app.use('/playmusic', playmusicRouter);
app.use('/account', accountRouter)
app.use('/api', router);

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

//list song
dboperator.getSong().then(result => {
  console.log(result);
})
/* router.get("/song", function (req, res) {
  dboperator.getSong().then(result => {
    console.log('2');
    console.log(result);
    res.json(result);
    //res.render("library",(result));
 })

}); */
module.exports = app;


