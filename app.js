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

app.post('/',(req,res)=>{
    let fs = require('fs');
    fs.writeFile('C:\\Users\\IXIKl\\WebstormProjects\\untitled4\\helloworld.txt', 'Hello World!', function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
    res.send('Order Submited')
})
app.delete('/BPCloudPrnt',(req,res)=>{
  let fs = require('fs')
  fs.unlink('C:\\Users\\IXIKl\\WebstormProjects\\untitled4\\helloworld.txt',function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
  res.send('Print Job Done')
})
app.post('/BPCloudPrnt',(req,res) =>{
  let parsedJSON = req.body;
  if(mac === parsedJSON['mac']){
    res.send('Printer Ready');
  }
  else{
    res.send('Mac Address doesnt match');
  }
});
app.get('/BPCloudPrnt',(req,res) =>{
  res.send('Receipt object sent');
});
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
