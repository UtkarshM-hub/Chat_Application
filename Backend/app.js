var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require("cors");
const Mongoose = require('mongoose');
const { ppid } = require('process');
const app = express();
const server=require("http").createServer(app);
const io=require("socket.io")(server,{
  cors:{
    origin:["http://localhost:3000"]
  }
});
const User=require("./Models/UserModal");

// imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const socket = require('../frontend/src/socket');

// declerations
const MONGODB_URI='YOUR_MONGODB_URI';


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images",express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
  'Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR');
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      return res.status(200).json({});
  }
  next();
}); 


app.use('/', indexRouter);
app.use('/users', usersRouter);

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


Mongoose.connect(MONGODB_URI,()=>{
  console.log("connected");
  io.on("connection",socket=>{
    console.log(socket.id)
  })
  server.listen(80);
})


module.exports = app;
