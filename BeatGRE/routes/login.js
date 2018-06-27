var express = require('express');

var app=express();

var mysql=require('mysql');
var path = require('path');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'gengbiao',
    database : 'bs_word_db'
});

connection.connect();

//
// app.get('/login',function (req,res) {
//     var  name=req.query.name;
//     var password=req.query.password;
//
//     var selectSQL = "select * from bs_user where name = '"+name+"' and password = '"+password+"'";
//     connection.query(selectSQL,function (err,rs) {
//         if (err) throw  err;
//         console.log(rs);
//         console.log('OK');
//         var okHtmlPath=path.resolve(__dirname,'..','ok.html');
//         res.sendFile(okHtmlPath);
//         // res.sendfile(__dirname + "/" + "OK.html" );
//     })
// })


module.exports = router;
