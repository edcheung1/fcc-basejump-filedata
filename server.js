'use strict'

var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

app.post('/', multer({ dest: './uploads/'}).single('upl'), function(req,res) {
  console.log(req.body);
  
  console.log(req.file);
  
  res.send(JSON.stringify({'file-size': req.file.size}));
});

app.listen(app.get('port'), function () {
        console.log('Node app is running on port ', app.get('port'));
    });
//console.log(app.get('views'));