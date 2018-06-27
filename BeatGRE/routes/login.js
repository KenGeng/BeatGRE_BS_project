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
//
// app.get('/signin.html',function (req,res) {
//     var registerHtmlPath=path.resolve(__dirname,'..','signin.html');
//     res.sendFile(registerHtmlPath);
//     // res.sendfile(__dirname+"/"+"register.html");
// })

/**
 * 实现注册功能
 */
app.get('/register',function (req,res) {
    var  name=req.body.username;
    var  password=req.body.password;
    var  email=req.body.password;
    var  user={user_name:name,password:password,email:email};
    connection.query('insert into user_info set ?',user,function (err,rs) {
        if (err) throw  err;
        console.log('register has been written to database\n');
        // res.sendfile(__dirname + "/" + "index.html" );
        var homeHtmlPath=path.resolve(__dirname,'..','home.html');
        res.sendFile(homeHtmlPath);
    })
});


var  server=app.listen(5222,function () {
    console.log("start");
})
//
