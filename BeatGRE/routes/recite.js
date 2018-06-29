var express = require('express');

var router = express.Router();
var fs = require('fs');
var connection = require('../dbhelper');

var file = './word_list/gre_list.json';
var request = JSON.parse(fs.readFileSync(file));

router.get('/', function(req, res, next) {
    //

    //
    // var value = localStorage["user_name"];
    // console.log("username???"+value);

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

                for(var i = done_num; i < done_num+wordbatch; ++i)
                {
                    // {"word":"abbreviate","translation":"v.缩写，缩短：briefer"}
                    response+='{"word":"'+request[i].word+'",';
                    response+='"translation":"'+request[i].translation+'"},';
                }
                response+='{"word":"'+request[wordbatch].word+'",';
                response+='"translation":"'+request[wordbatch].translation+'"}';
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



module.exports = router;
