require('dotenv').config();

var express = require('express');  
const path = require('path');
// var mysql = require('mysql');  
var bodyParser=require('body-parser');  
const ligiRouter = require("./routers/ligiRouter");
const ligiRouterMVC = require('./routers/ligiRouterMVC');
 
var urlencoderParser = bodyParser.urlencoded({extended:false});  

// //Mysql Connection  
// var con = mysql.createConnection({  
//     host:'localhost',  
//     user:'vasi',  
//     password:'@DminTest123!',  
//     database:'proiectppaw'  
// });
  
var app=express();  
var port = process.env.port||3000;  
app.use(bodyParser.json());
app.use(express.static("views"))
app.use(ligiRouter);
app.use(ligiRouterMVC);

// app.engine('html', require('ejs').renderFile);
// app.set('views', __dirname+'\views');
// app.use(express.static(path.join(__dirname + '/views')));
app.set("views", "views");
app.set("view engine", "ejs")

// //Api code here  
//     //GET  
// app.get('/ligi',function(req,res){  
//     var qry = "select * from ligi";  
//     con.query(qry,function(err,rows){  
//         if(err)  
//             throw err;  
//         console.log(rows);  
//         res.json(rows);  
//     });  
// });  

// //GET with id  
// app.get('/ligi/:id',function(req,res){  
//     var qry = "select * from ligi where idLiga="+req.params.id;  
//     con.query(qry,function(err,rows){  
//         if(err)  
//             throw err;  
//         console.log(rows[0]);  
//         res.json(rows[0]);  
//     });  
// }); 

app.listen(port);  
console.log('Server is started on http://localhost:'+port);  
