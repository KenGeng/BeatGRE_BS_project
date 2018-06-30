var express = require('express');

var router = express.Router();

var connection = require('../dbhelper');

var GRE_List_str='[' ;
var GRE_List;

var ii=0;
// var old_book_id;

router.get('/', function(req, res, next) {
    //

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
    connection.query('select cur_book from user_info where user_name = "'+user_name+'"',function(err, result){
        if (result.length==0){
            console.log("fuck1!");
            throw err;
        }else{
            var book_id = result[0].cur_book;

            console.log("book"+book_id);
            connection.query(
                'select word_batch,daily_task,done_num  from '+user_name+'_setting where book_id = '+book_id,function(err, result) {
                    console.log("sql res len:"+result.length);
                    if (result.length==0){
                        console.log("fuck2!");
                        throw err;
                    }else{
                        var wordbatch = 5;
                        var done_num = 10;
                        var task = 49;


                        wordbatch = result[0].word_batch;
                        done_num = result[0].done_num;
                        task = result[0].daily_task;

                        console.log("done_num:"+done_num);
                        console.log("wordbatch:"+wordbatch);
                        connection.query('select word,translation from '+'book_'+book_id,function (err, result) {
                            if (result.length==0){
                                console.log("fuck!");
                                throw err;
                            }else{
                                if (ii==0){
                                    GRE_List_str='[' ;
                                    GRE_List='';
                                    for (let i = 0; i < result.length -1; i++) {
                                        GRE_List_str +='{ "word": "'+result[i].word+'", "translation": "'+ result[i].translation+'" },';
                                    }
                                    GRE_List_str +='{ "word": "'+result[result.length -1].word+'", "translation": "'+ result[ result.length -1].translation+'" }';
                                    GRE_List_str +=' ]';
                                    console.log(GRE_List_str);
                                    GRE_List = JSON.parse(GRE_List_str);
                                    console.log("done");
                                    // ii=1;
                                }


                                var response = '{"wordbatch": [ ';

                                for(var i = done_num; i < done_num+wordbatch-1; ++i)
                                {
                                    // {"word":"abbreviate","translation":"v.缩写，缩短：briefer"}
                                    response+='{"word":"'+GRE_List[i].word+'",';
                                    response+='"translation":"'+GRE_List[i].translation+'"},';
                                }
                                response+='{"word":"'+GRE_List[done_num+wordbatch-1].word+'",';
                                response+='"translation":"'+GRE_List[done_num+wordbatch-1].translation+'"}';
                                response+='] }';
                                console.log(response);
                                var temp = JSON.parse(response);
                                console.log("wa"+temp.toString());
                                console.log("haha"+temp.wordbatch[0].word);
                                console.log('{"result" : "success", "worddata" :' +(response)+'}');
                                // console.log('{"result" : "success", "data" :' +JSON.stringify(response)+'}')
                                var test = JSON.parse('{"result" : "success", "worddata" :' +(response)+'}');
                                console.log(test.result);
                                res.end('{"result" : "success", "word_batch" : '+wordbatch+',"task" : '+task+',"worddata" :' +(response)+'}');
                            }
                        });


                    }
                });

        }

    });






});
router.get('/nextpage', function(req, res, next) {

    var kk = req.url;
    var temp = kk.split('&');

    var user_name = temp[1];
    console.log(user_name);
    connection.query('select cur_book from user_info where user_name = "'+user_name+'"',function(err, result){
        if (result.length==0){
            console.log("fuck1!");
            throw err;
        }else{
            var book_id = result[0].cur_book;
            connection.query(
                'select word_batch,daily_task,done_num  from '+user_name+'_setting where book_id ='+book_id+';',function(err, result) {
                    console.log("sql res len:"+result.length);
                    if (result.length==0){
                        console.log("fuck3!");
                        throw err;
                    }else{
                        var wordbatch = 5;
                        var done_num = 10;
                        var task = 49;
                        wordbatch = result[0].word_batch;
                        done_num = result[0].done_num;
                        task = result[0].daily_task;

                        connection.query(
                            'UPDATE '+user_name+'_setting'+' SET done_num=done_num+'+wordbatch+' where book_id='+book_id+';',function (err,result) {
                                res.end('{"result" : "success", "worddata" :' +'"renew" }');
                            }
                        );
                    }
                });
        }
    });


});
router.get('/backpage', function(req, res, next) {

    var kk = req.url;
    var temp = kk.split('&');

    var user_name = temp[1];
    console.log(user_name);
    connection.query('select cur_book from user_info where user_name = "'+user_name+'"',function(err, result){
        if (result.length==0){
            console.log("fuck1!");
            throw err;
        }else{
            var book_id = result[0].cur_book;
            connection.query(
                'select word_batch,daily_task,done_num  from '+user_name+'_setting where book_id ='+book_id+';',function(err, result) {
                    if (result.length==0){
                        console.log("fuck4!");
                        throw err;
                    }else{
                        var wordbatch = 5;
                        var done_num = 10;
                        var task = 49;
                        wordbatch = result[0].word_batch;
                        done_num = result[0].done_num;
                        task = result[0].daily_task;
                        connection.query(
                            'UPDATE '+user_name+'_setting'+' SET done_num=done_num-'+wordbatch+' where book_id='+book_id+';',function (err,result) {
                                res.end('{"result" : "success", "worddata" :' +'"renew" }');
                            }
                        );
                    }
                });
        }
    });



});


module.exports = router;
