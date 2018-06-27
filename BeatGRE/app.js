var createError = require('http-errors');
var express = require('express');

// const cors = require('cors');

//connect database first; mysql
var mysql=require('mysql');
var path = require('path');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'gengbiao',
    database : 'beatgre_db'
});

connection.connect();


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

// var registerRouter = require('./routes/register');
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/register', registerRouter);
app.post('/register', function (req, res) {

    console.log(req.body);
    console.log(req.body.username);
    // console.log(req.body.page);
    // console.log(req.query);

    //这时可以看到控制台输出了：前端传过来的参数{page:1,pageSize:10,classify_id:77}
    res.send('respond with a resource');
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
