'use strict'

var express = require('express');
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));

app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
  })
  .post(multer({ dest: './uploads/'}).single('upl'), function(req,res) {
    console.log(req.body);
    
    console.log(req.file);
    
    var fileSize = req.file.size;
    
    fs.unlinkSync('./uploads/' + req.file.filename);
    
    res.send(JSON.stringify({'file-size': fileSize}));
  });

// app.post('/', multer({ dest: './uploads/'}).single('upl'), function(req,res) {
//   console.log(req.body);
  
//   console.log(req.file);
  
//   var fileSize = req.file.size;
  
//   fs.unlinkSync('./uploads/' + req.file.filename);
  
//   res.send(JSON.stringify({'file-size': fileSize}));
// });

app.listen(app.get('port'), function () {
        console.log('Node app is running on port ', app.get('port'));
    });