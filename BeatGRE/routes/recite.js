var express = require('express');
var router = express.Router();
var fs = require('fs');

var wordMapObj = new Map();
var word_ID_map = new Map();
var file = './word_list/gre_list.json';
var request = JSON.parse(fs.readFileSync(file));
var loopNum = 0;
for (i in request){
    var x = request[i].word;
    var y = request[i].translation;
    wordMapObj.set(x,y);
    word_ID_map.set(loopNum,x);
    loopNum++;
}
/* GET home page. */
router.get('/', function(req, res, next) {
    var remembered_num=0;
    var response = '{"wordpatch": [ ';
    var wordpatch = 10;
    for(var i = 0; i < wordpatch; ++i)
    {
        // response += word_ID_map.get(remembered_num+i) + "&";
        // response += wordMapObj.get(word_ID_map.get(remembered_num+i)) + "&";
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
