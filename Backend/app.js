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
const io=require("./Socket").init(server);
const User=require("./Models/UserModal");
const Online=require("./Models/OnlineUsers");

// imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ConnectionRouter = require('./routes/Connections');
var InventoryRouter = require('./routes/Inventory');
var ShopRouter = require('./routes/Store');
var Payment = require('./routes/Payment');
var Analytics = require('./routes/Analytics');
const socket = require('../frontend/src/socket');

// declerations
const MONGODB_URI='mongodb+srv://UtMandape:1BGR3QO2fcFmFHXw@cluster0.akibk.mongodb.net/Chat?retryWrites=true&w=majority';


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
app.use('/Connection', ConnectionRouter);
app.use('/Inventory', InventoryRouter);
app.use('/Shop', ShopRouter);
app.use('/Payment', Payment);
app.use('/Analytics', Analytics);

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
  io.on("connection",(socket)=>{
    console.log(socket.id)
    socket.on("saveConnect",async(data)=>{
      if(data.userId!==null || data.userId!==undefined){
      try{
        const doesAlreadyExists=await User.findById(data.userId);
        if(doesAlreadyExists[0]!==undefined){
          console.log(doesAlreadyExists);
          const updated=await User.findByIdAndUpdate(doesAlreadyExists._id,{socketId:socket.id,IsOnline:true});
          return;
        }
        let timeInterval=setTimeout(async()=>{
          const newOnline=await User.findByIdAndUpdate(doesAlreadyExists._id,{socketId:socket.id,IsOnline:true});
          socket.broadcast.emit("IsMyFriendOnline",{id:data.userId,socketId:socket.id});
          clearTimeout(timeInterval);
          return;
        })
      }
      catch(err){
        console.log(err)
      }
      }
    });
    socket.on("disconnect",async()=>{
      console.log("event fired")
      const user=await User.findOne({"socketId":socket.id});
      console.log(socket.id)
      await User.findOneAndUpdate({"socketId":socket.id},{IsOnline:false});
      if(user!==null){
        socket.broadcast.emit("IsMyFriendOffline",{id:user._id});
      }
      return;
    })

    socket.on("sendMsg",(message)=>{
      console.log(message)
      socket.to(message.socketId).emit("getMsg",{data:message.data});
    })
  })
  server.listen(80);
})


module.exports = app;
