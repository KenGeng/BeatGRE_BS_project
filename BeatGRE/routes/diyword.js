var express = require('express');

var router = express.Router();
var fs = require('fs');
var connection = require('../dbhelper');
router.get('/', function(req, res, next) {
    //

    var kk = req.url;
    var temp = kk.split('&');
    // console.log("url:"+kk);
    var user_name = temp[1];
    console.log(user_name);

    //回调函数有点坑 先这样写吧 dirty code
    connection.query(
        'select word,translation  from '+user_name+'_diyword ',function(err, result) {
            console.log("sql res len:"+result.length);
            if (result.length==0){
                console.log("fuck!");
                throw err;
            }else{
                var wordbatch = result.length;

                console.log("wordbatch:"+wordbatch);


                var response = '"wordbatch": [ ';

                for(var i = 0; i < wordbatch-1; ++i)
                {
                    // {"word":"abbreviate","translation":"v.缩写，缩短：briefer"}
                    response+='{"word":"'+result[i].word+'",';
                    response+='"translation":"'+result[i].translation+'"},';
                }
                response+='{"word":"'+result[wordbatch-1].word+'",';
                response+='"translation":"'+result[wordbatch-1].translation+'"}';
                response+='] ';
                console.log(response);
                // var temp = JSON.parse(response);
                // console.log("wa"+temp.toString());
                // console.log("haha"+temp.wordbatch[0].word);
                console.log('{"result" : "success", ' +(response)+'}');
                res.end('{"result" : "success", ' +(response)+'}');
            }
        });





});
router.get('/nextpage', function(req, res, next) {

    var kk = req.url;
    var temp = kk.split('&');

    var user_name = temp[1];
    console.log(user_name);

    connection.query(
        'select word_batch,daily_task,done_num  from '+user_name+'_setting where book_id = 1 ',function(err, result) {
            console.log("sql res len:"+result.length);
            if (result.length==0){
                console.log("fuck!");
                throw err;
            }else{
                var wordbatch = 5;
                var done_num = 10;
                var task = 49;
                wordbatch = result[0].word_batch;
                done_num = result[0].done_num;
                task = result[0].daily_task;
                console.log("wtf");
                console.log("done_num:"+done_num);
                console.log("wordbatch:"+wordbatch);

                connection.query(
                    'UPDATE '+user_name+'_setting'+' SET done_num=done_num+'+wordbatch+' where book_id=1;',function (err,result) {
                        res.end('{"result" : "success", "worddata" :' +'"renew" }');
                    }
                );
            }
        });

});
router.get('/backpage', function(req, res, next) {

    var kk = req.url;
    var temp = kk.split('&');

    var user_name = temp[1];
    console.log(user_name);

    connection.query(
        'select word_batch,daily_task,done_num  from '+user_name+'_setting where book_id = 1 ',function(err, result) {
            console.log("sql res len:"+result.length);
            if (result.length==0){
                console.log("fuck!");
                throw err;
            }else{
                var wordbatch = 5;
                var done_num = 10;
                var task = 49;
                wordbatch = result[0].word_batch;
                done_num = result[0].done_num;
                task = result[0].daily_task;
                connection.query(
                    'UPDATE '+user_name+'_setting'+' SET done_num=done_num-'+wordbatch+' where book_id=1;',function (err,result) {
                        res.end('{"result" : "success", "worddata" :' +'"renew" }');
                    }
                );
            }
        });

});
router.get('/add', function(req, res, next) {
    //

    var kk = req.url;
    var temp = kk.split('&');
     console.log("url:"+kk);

    var user_name = temp[1];
    var word = temp[2];
    var trans = temp[3];
    trans=decodeURI(trans);
    console.log(word);
    console.log(decodeURI(trans));//解码url
    var item = {"word":word,"translation":trans};
    connection.query('insert into '+user_name+'_diyword set ?',item,function (err,rs) {
        if (err) throw  err;
        console.log('new word has been written to database\n');});

});

module.exports = router;