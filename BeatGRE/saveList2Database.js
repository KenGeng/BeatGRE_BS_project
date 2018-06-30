
var fs = require('fs');
var connection = require('./dbhelper');

var file = './word_list/gre_list.json';
var GRE_List = JSON.parse(fs.readFileSync(file));

function save_db(id,totalnum ){

    connection.query('create table  '+'book_'+id+' (word_id int NOT NULL AUTO_INCREMENT, word varchar(40) ,translation varchar(200),primary key(word_id) )',function (err,rs) {
        if (err) throw  err;
        else {
            console.log('book'+id+' has been written to database\n');
            for (let i = 1500; i <1500+totalnum; i++) {
                var word=GRE_List[i].word;
                var  trans=GRE_List[i].translation;
                var item = {"word":word,"translation":trans};
                connection.query('insert into '+'book_'+id+' set ?',item,function (err,rs) {
                    if (err) throw  err;
                    // console.log('new word has been written to database\n');
                });
            }
        }

    });
}
save_db(2,1500);


