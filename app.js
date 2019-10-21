var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personalRouter = require('./routes/personal')
var carSharingRouter = require('./routes/carSharing')
var cardetailRouter = require('./routes/cardetail')
var carlistRouter = require('./routes/carlist')
var mypassport = require('./config/passport')






const bodyParser = require("body-parser");
const fs         = require("fs");
const config     = require("./config.js");
const alipayf2f  = require("./lib/alipay_f2f");
const SERVICE_PORT = 3000;

var app = express();
//设置跨域请求的允许操作
app.all('*', function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*'); //针对所有请求用户都允许
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); //针对指定的请求用户允许，其他用户禁止访问
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next()
})

// view engine setup

app.use(require("compression")());
app.engine(".ejs", require("ejs").__express);
app.set("views", "./views");
app.set("view engine", "ejs")


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
//使用passport的验证方法
mypassport(passport)

app.use((req, res, next) => {
	req.config = config;
	req.alipayf2f = new alipayf2f(config);


	/* 模拟数据库 仅仅作为演示 */
	req.database = {
		get(id) {
			return new Promise((resolve, reject) => {
				if (!fs.existsSync(`./fs-database/${id}.json`)) {
					return resolve(null);
				}
				fs.readFile(`./fs-database/${id}.json`, function (err, data) {
					if (err) return (reject);
					resolve(JSON.parse(data.toString()));
				});
			});
		},

		delete(id) {
			return new Promise((resolve, reject) => {
				if (!fs.existsSync(`./fs-database/${id}.json`)) {
					return resolve();
				}
				fs.unlink((`./fs-database/${id}.json`, function (err) {
					resolve(data);
				}));
			});
		},

		insert(id, obj) {
			return new Promise((resolve, reject) => {
				if (fs.existsSync(`./fs-database/${id}.json`)) {
					return resolve(false);
				}
				fs.writeFile(`./fs-database/${id}.json`, JSON.stringify(obj), function (err) {
					if (err) return reject(err);
					resolve(true);
				});
			});
		},

		update(id, obj) {
			return new Promise((resolve, reject) => {
				fs.writeFile(`./fs-database/${id}.json`, JSON.stringify(obj), function (err) {
					if (err) return reject(err);
					resolve(true);
				});
			});
		},
	};
	res.error = (result) => res.json({ "status": false, message: result });
	res.success = (result) => res.json({ "status": true, message: result });
	res.catch = (error) => {
		console.error(error);
		res.json({ "status": false, "message": "服务器错误, 请稍后重试。" }).end();
	};
	next();
});

app.use("/pay", require("./controllers/pay"));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/personal', personalRouter);
app.use('/carSharing', carSharingRouter);
app.use('/cardetail', cardetailRouter);
app.use('/carlist', carlistRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;