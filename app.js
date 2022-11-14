const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require("fs");

const app = express();
let mac = '00:62:2F:FB:18'
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
  if(fs.existsSync(__dirname +'/helloworld.spt') ) {
    res.send('Waiting for Order')
  }
  else{
    res.send('nope')
  }
})
app.post('/',(req,res)=>{
    let fs = require('fs');
    fs.writeFile(__dirname +'/helloworld.spt', 'Hello World!', function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
    res.send('Order Submited')
})
app.delete('/BPCloudPrnt',(req,res)=>{
  let fs = require('fs')
  fs.unlink(__dirname +'/helloworld.spt',function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
  res.send('Print Job Done')
})
app.post('/BPCloudPrnt',(req,res) =>{
  let parsedJSON = req.body;
  console.log(parsedJSON)
  if(mac === parsedJSON['printerMAC']){
    if(fs.existsSync(__dirname +'/helloworld.spt') ){
      let arr = {
        jobReady: true,
        mediaTypes: [text/plain]
      }
      res.send(JSON.stringify(arr));
    }

  }
  else{
    res.send('Mac Address doesnt match');
  }
});
app.get('/BPCloudPrnt',(req,res) =>{
  res.setHeader('Content-Type', 'application/vnd.star.starprnt')
  res.sendFile(__dirname +'/helloworld.spt');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
