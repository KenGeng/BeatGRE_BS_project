var express = require('express');

var router = express.Router();

var connection = require('../dbhelper');

var GRE_List_str='[' ;
var GRE_List;

var ii=0;

router.get('/', function(req, res, next) {
    //

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
                                    ii=1;
                                }


                                var response = '{"wordbatch": [ ';
                                //记忆曲线
                                if (done_num>3*task){
                                    for (let i = 0; i < wordbatch*2/3-3; i++) {
                                        var index = Math.round(Math.random()*task+done_num-task);
                                        response+='{"word":"'+GRE_List[index].word+'",';
                                        response+='"translation":"'+GRE_List[index].translation+'"},';
                                    }
                                    for (let i = wordbatch*2/3; i < wordbatch-2; i++) {
                                        var index = Math.round(Math.random()*task+done_num-2*task);
                                        response+='{"word":"'+GRE_List[index].word+'",';
                                        response+='"translation":"'+GRE_List[index].translation+'"},';
                                    }
                                    for (let i = 0; i < 4; i++) {
                                        var index = Math.round(Math.random()*done_num);
                                        response+='{"word":"'+GRE_List[index].word+'",';
                                        response+='"translation":"'+GRE_List[index].translation+'"},';
                                    }
                                    var index = Math.round(Math.random()*done_num);
                                    response+='{"word":"'+GRE_List[index].word+'",';
                                    response+='"translation":"'+GRE_List[index].translation+'"}';
                                }else{
                                    for (let i = 0; i < wordbatch-1; i++) {
                                        var index = Math.round(Math.random()*task);
                                        response+='{"word":"'+GRE_List[index].word+'",';
                                        response+='"translation":"'+GRE_List[index].translation+'"},';
                                    }
                                    var index = Math.round(Math.random()*task);
                                    response+='{"word":"'+GRE_List[index].word+'",';
                                    response+='"translation":"'+GRE_List[index].translation+'"}';
                                }



                                response+='] }';
                                console.log('{"result" : "success", "worddata" :' +(response)+'}');

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

                        // connection.query(
                        //     'UPDATE '+user_name+'_setting'+' SET done_num=done_num+'+wordbatch+' where book_id='+book_id+';',function (err,result) {
                        //         res.end('{"result" : "success", "worddata" :' +'"renew" }');
                        //     }
                        // );
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
                        // connection.query(
                        //     'UPDATE '+user_name+'_setting'+' SET done_num=done_num-'+wordbatch+' where book_id='+book_id+';',function (err,result) {
                        //         res.end('{"result" : "success", "worddata" :' +'"renew" }');
                        //     }
                        // );
                    }
                });
        }
    });



});


module.exports = router;
