var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('12ibody: ' + (req.url));
    console.log('12333:'+req.query);
    console.log('aibody: ' + (req.body));
    res.send('respond with a resource');
});

module.exports = router;
/* GET home page. */

//
// var mysql=require('mysql');
// var path = require('path');
//
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'gengbiao',
//     database : 'beatgre_db'
// });
//
// connection.connect();


/**
 * 实现注册功能
 */
// router.post('/',function (req,res) {
//
//     console.log('12ibody: ' + (req.url));
//     console.log('aibody: ' + (req.body));
//     console.log("???");
//     // var data = req.url.split('&');
//     // var  name=req.body.username;
//     // var  password=req.body.password;
//     // var  email=req.body.password;
//
//     // var  name=data[1];
//     // var  password=data[2];
//     // var  email=data[3];
//     // var  user={user_name:name,password:password,email:email};
//     // console.log('body: ' + (req.body));
//     //
//     // connection.query('insert into user_info set ?',user,function (err,rs) {
//     //     if (err) throw  err;
//     //     console.log('register has been written to database\n');
//     //     // res.sendfile(__dirname + "/" + "index.html" );
//     //     var homeHtmlPath=path.resolve(__dirname,'..','home.html');
//     //     res.sendFile(homeHtmlPath);
//     // })
// });
//
//
// module.exports = router;
