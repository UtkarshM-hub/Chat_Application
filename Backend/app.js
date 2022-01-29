var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require("cors");
const io=require("socket.io")(80,{
  cors:{
    origin:["http://localhost:3000"]
  }
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const socket = require('../frontend/src/socket');

var app = express();

// let users=[{ id: 'jMZ0sf9TqQn4WTaYAAAF', username: 'utkarsh', rooms: 'js css html',contacts:[] }];
let users=[];



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
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

io.on("connect",socket=>{
  console.log("we have a connection")
  socket.on("login",(data,cb)=>{
    const {userName,roomName}=data;
    try{
      let user=users.findIndex((u)=>u.userName.toString()===userName.toString());
      if(user!==-1){
        cb({type:"error",message:"UserName is already in use"});
      }
      else{
        let newUser={userName:userName,roomName:roomName};
        users.push(newUser);
        cb({type:"success",message:"Successfully joined the room"});
      }
    }
    catch(err){
      console.log(err);
    }
  })
})

module.exports = app;
