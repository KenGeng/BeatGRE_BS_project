var createError = require('http-errors');
var express = require('express');

// const cors = require('cors');

//connect database first; mysql
var path = require('path');
//
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'gengbiao',
//     database : 'beatgre_db'
// });
//
// connection.connect();

var connection = require('./dbhelper');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
// app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 允许跨域

app.all('*',function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');


    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }

});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reciteRouter =require('./routes/recite');

var diywordRouter =require('./routes/diyword');
// var registerRouter = require('./routes/register');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recite',reciteRouter);
app.use('/diyword',diywordRouter);
// app.use('/register', registerRouter);

//register handler
app.post('/register', function (req, res) {

    console.log(req.body);
    console.log(req.body.username);
    // console.log(req.body.page);
    // console.log(req.query);
    var  user={user_name:req.body.username,password:req.body.password,email:req.body.email};
    console.log("sql in: "+user.user_name+" "+ user.email);
    connection.query(
        'select user_name  from user_info where user_name = ? ',
        [user.user_name ],
        function(err, result) {
            if (result.length!=0){
                console.log(result[0]);
                console.log("sql size: "+result.length);
                // for(var i = 0; i < result.length; i++)
                // {
                //     //option[i] = {'label':results[i].domain,'value':results[i].domain};
                //     //console.log(results[i].domain);
                //     // option.push({'label':results[i].domain,'value':results[i].domain});
                //     console.log("sql out: "+result[i].email);
                // }
                res.end('{"result" : "duplicate_name", "status" : 200}');
            }else{
                connection.query(
                    'select  email from user_info where  email = ?',
                    [ user.email],
                    function(err, result) {
                        if (result.length!=0){
                            res.end('{"result" : "duplicate_email", "status" : 200}');
                        }else {
                            //insert success
                            connection.query('insert into user_info set ?',user,function (err,rs) {
                                if (err) throw  err;
                                console.log(user.user_name+'register has been written to database\n');
                                //add user_setting_table
                                // create table user_setting(
                                //     setting_id int NOT NULL AUTO_INCREMENT,
                                //     book_id int DEFAULT 1 ,
                                //     word_batch int DEFAULT 7,
                                //     daily_task int DEFAULT 49,
                                //     done_num int DEFAULT 0,
                                //     primary key(setting_id)
                                //  );
                                connection.query('create table  '+user.user_name+'_setting (setting_id int NOT NULL AUTO_INCREMENT, book_id int DEFAULT 1 ,word_batch int DEFAULT 7,daily_task int DEFAULT 49,done_num int DEFAULT 0,primary key(setting_id) )',function (err,rs) {
                                    if (err) throw  err;
                                    console.log('user_setting table has been written to database\n');
                                });
                                var initial_setting ={book_id:1,word_batch:10,daily_task:49,done_num:0};
                                connection.query('INSERT INTO '+user.user_name+'_setting set ?',initial_setting,function (err,rs) {
                                    if (err) throw  err;
                                    console.log('initial setting table has been written to database\n');
                                });
                                connection.query('create table  '+user.user_name+'_diyword (word_id int NOT NULL AUTO_INCREMENT, book_id int DEFAULT 1 ,word varchar(40) ,translation varchar(200),primary key(word_id) )',function (err,rs) {
                                    if (err) throw  err;
                                    console.log('diyword has been written to database\n');
                                });

                                res.end('{"result" : "success", "status" : 200}');

                                // res.sendFile(homeHtmlPath);
                            });
                        }

                    }
                );
            }

        }
    );





});


//login handler
app.post('/login', function (req, res){
    console.log(req.body);
    console.log(req.body.user_name_email);
    // console.log(req.body.page);
    // console.log(req.query);
    var  user={user_name_email:req.body.user_name_email,password:req.body.password};
    console.log("sql in: "+user.user_name_email+" "+ user.password);
    connection.query(
        //check username first (high priority)
        'select user_name,password  from user_info where user_name = ? ',
        [user.user_name_email],
        function(err, result) {
            if (result.length!=0){
                console.log(result[0]);
                console.log("sql size: "+result.length);
                console.log(result[0].password);
                console.log(user.password);
                if (result[0].password ===user.password ) {
                    console.log("???");
                    res.end('{"result" : "success", "user_name" : '+'\"'+user.user_name_email+'\" }');//为了符合json的格式，要加双引号
                }else res.end('{"result" : "wrong_password", "status" : 200}');
            }else{
                //check email
                connection.query(
                    'select  email,password from user_info where  email = ?',
                    [ user.user_name_email],
                    function(err, result) {

                        console.log("length:"+result.length);
                        if (result.length!=0){
                            if (result[0].password ==user.password ) {
                                res.end('{"result" : "success", "status" : 200}');
                            }else res.end('{"result" : "wrong_password", "status" : 200}');
                        }else {
                            res.end('{"result" : "not_exist", "status" : 200}');
                        }

                    }
                );
            }

        }
    );


});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("error la");
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




app.listen(5222,function () {
    console.log("start");

});
module.exports = app;
