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

let users=[{ id: 'jMZ0sf9TqQn4WTaYAAAF', username: 'utkarsh', rooms: 'js css html',contacts:[] }];
const messages=[];



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
  socket.on("joinRoom",(data,cb)=>{
    const isUserExist=users.findIndex((item)=>item.username===data.username);
    if(isUserExist=== -1){
      socket.join(data.room);
      users.push({id:socket.id,username:data.username,rooms:data.room});
      cb({isUserExist:false});
    }
    else{
      return cb({isUserExist:true});
    }
    console.log(isUserExist,users);
  })
  socket.on("getRoomData",()=>{
    let data=users.find((item)=>item.id==='jMZ0sf9TqQn4WTaYAAAF');
    console.log(users);
    socket.emit("RoomData",{data:data})
  })

  socket.on("AddContact",(data,cb)=>{
    let updateUsers=users;
    let index=updateUsers.findIndex((item)=>item.id==='jMZ0sf9TqQn4WTaYAAAF');
    updateUsers[index].contacts.push({id:data.id,name:data.name});
    updateUsers[index].rooms=updateUsers[index].rooms+" "+data.name;
    users=updateUsers;
    console.log(updateUsers);
    cb(users);
  })
})

module.exports = app;
