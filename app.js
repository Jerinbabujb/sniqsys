var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jobhelpers=require('./insert/insertData');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { insertJobData } = require('./insert/insertData'); // Import the insertJobData function

var app = express();
var connection = require('./configuration/connecting'); // Import the client object

const bodyParser = require('body-parser');
var db=require('./configuration/connection');
//var db=require('./configuration/connecting');
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(bodyParser.json()); // Parse JSON data
//app.use(jobhelpers.addJob(client)); // Pass the client object to the addJob middleware

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// Connect to the database



app.use('/', indexRouter);
app.use('/admin.hbs', usersRouter);
app.listen(3001,()=>{
    console.log("server is running");
})
//app.use(jobhelpers.addJob());
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
