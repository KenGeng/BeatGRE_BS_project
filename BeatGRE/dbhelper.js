
//connect database first; mysql
var mysql=require('mysql');
var path = require('path');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'gengbiao',
    database : 'beatgre_db1'
});

connection.connect();

module.exports = connection;
