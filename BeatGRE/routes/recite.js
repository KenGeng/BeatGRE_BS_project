var express = require('express');

var router = express.Router();
var fs = require('fs');
var connection = require('../dbhelper');

var file = './word_list/gre_list.json';
var request = JSON.parse(fs.readFileSync(file));
var hasRemembered=0 ;
router.get('/', function(req, res, next) {


    // var value = localStorage["user_name"];

    var kk = req.url;
    var temp = kk.split('&');
    // console.log("url:"+kk);
    var user_name = temp[1];
    console.log(user_name);
    // // book_id int DEFAULT 1 ,
    // //     word_batch int DEFAULT 7,
    // //     daily_task int DEFAULT 49,
    // //     done int DEFAULT 0,
    //回调函数有点坑 先这样写吧 dirty code
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


                var response = '{"wordbatch": [ ';

                for(var i = done_num; i < done_num+wordbatch-1; ++i)
                {
                    // {"word":"abbreviate","translation":"v.缩写，缩短：briefer"}
                    response+='{"word":"'+request[i].word+'",';
                    response+='"translation":"'+request[i].translation+'"},';
                }
                response+='{"word":"'+request[done_num+wordbatch-1].word+'",';
                response+='"translation":"'+request[done_num+wordbatch-1].translation+'"}';
                response+='] }';
                console.log(response);
                var temp = JSON.parse(response);
                console.log("wa"+temp.toString());
                console.log("haha"+temp.wordbatch[0].word);
                console.log('{"result" : "success", "worddata" :' +(response)+'}');
                // console.log('{"result" : "success", "data" :' +JSON.stringify(response)+'}')
                var test = JSON.parse('{"result" : "success", "worddata" :' +(response)+'}');
                console.log(test.result);
                res.end('{"result" : "success", "worddata" :' +(response)+'}');
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
                console.log("wtf"+task);
                console.log("done_num:"+done_num);
                console.log("wordbatch:"+wordbatch);
                hasRemembered+=wordbatch;
                console.log("has done:"+hasRemembered);

                if (hasRemembered<task){
                    console.log("what?");
                    connection.query(
                        'UPDATE '+user_name+'_setting'+' SET done_num=done_num+'+wordbatch+' where book_id=1;',function (err,result) {
                            res.end('{"result" : "success", "worddata" :' +'"renew" }');
                        }
                    );
                }else res.end('{"result" : "error", "worddata" :' +'"next_to_end" }');

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
                hasRemembered-=wordbatch;
                if (hasRemembered>0){
                    connection.query(
                        'UPDATE '+user_name+'_setting'+' SET done_num=done_num-'+wordbatch+' where book_id=1;',function (err,result) {
                            res.end('{"result" : "success", "worddata" :' +'"renew" }');
                        }
                    );
                }else res.end('{"result" : "error", "worddata" :' +'"back_to_front" }');

            }
        });

});


module.exports = router;
