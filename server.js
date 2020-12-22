require('dotenv').config();

var express = require('express');
const path = require('path');
// var mysql = require('mysql');
var bodyParser = require('body-parser');
const ligiRouter = require('./routers/ligiRouter');
const jucatoriRouter = require('./routers/jucatoriRouter');
const transferuriRouter = require('./routers/transferuriRouter');
const ligiRouterMVC = require('./routers/ligiRouterMVC');
const echipeRouterMVC = require('./routers/echipeRouterMVC');
const echipeRouter = require('./routers/echipeRouter');

var app = express();
var port = process.env.port || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(ligiRouter);
app.use(jucatoriRouter);
app.use(transferuriRouter);
app.use(ligiRouterMVC);
app.use(echipeRouterMVC);
app.use(echipeRouter);

// app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname + '/views'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.listen(port);
console.log('Server is started on http://localhost:' + port);
