var express = require('express');  
// var mysql = require('mysql');  
var bodyParser=require('body-parser');  
const ligiRouter = require("./routers/ligiRouter")

  
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
// app.use(express.static("views"))
app.use(ligiRouter)

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
