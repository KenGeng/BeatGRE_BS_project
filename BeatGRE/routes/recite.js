var express = require('express');

var router = express.Router();
var fs = require('fs');
var connection = require('./dbhelper');

var file = './word_list/gre_list.json';
var request = JSON.parse(fs.readFileSync(file));

router.get('/', function(req, res, next) {
    //
    // connection.query(
    //     'select user_name  from user_info where user_name = ? ',
    //     [user.user_name ]);
    //


    var wordpatch = 10;
    var record = 10;
    var response = '{"wordpatch": [ ';

    for(var i = record; i < record+wordpatch; ++i)
    {
        // {"word":"abbreviate","translation":"v.缩写，缩短：briefer"}
        response+='{"word":"'+request[i].word+'",';
        response+='"translation":"'+request[i].translation+'"},';
    }
    response+='{"word":"'+request[wordpatch].word+'",';
    response+='"translation":"'+request[wordpatch].translation+'"}';
    response+='] }';
    console.log(response);
    var temp = JSON.parse(response);

     console.log("haha"+temp.wordpatch[0].word);
    console.log('{"result" : "success", "worddata" :' +(response)+'}');
    // console.log('{"result" : "success", "data" :' +JSON.stringify(response)+'}')
    var test = JSON.parse('{"result" : "success", "worddata" :' +(response)+'}');
    console.log(test.result);
    res.end('{"result" : "success", "worddata" :' +(response)+'}');


});



module.exports = router;
