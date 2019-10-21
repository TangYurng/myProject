var userDAO = require('../models/userDAO')
var bcrypt = require('bcrypt')
var formidable = require('formidable')
var path = require('path')
var jwt = require('jsonwebtoken')
var qs = require('querystring')
var request = require('request')
var userController = {
    register: function(req, res) {
        //接收用户请求传入的参数，并创建用户对象
        var user = { userTel: req.body.tel, userPwd: req.body.password }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.userPwd, salt, function(err, hash) {
                //hash是加密后的字符
                user.userPwd = hash   
                userDAO.register(user, function(err, results) {
                    if (err) {
                        res.status(500).json({ msg: '数据库错误，注册失败！' })
                    } else {
                        res.status(200).json({ msg: '注册成功！' })
                    }
                })
            });
        });
    },
    login: function(req, res) {
        //接收用户请求传入的参数，并创建用户对象
        var user = { userTel: req.body.tel, userPwd: req.body.password }
        userDAO.getUserByTel(user.userTel, function(err, results) {
            if (err) {
                res.status(500).json({ msg: '数据库错误，登录失败！' })
            } else {
                if (results == null || results.length != 1) {
                    res.status(200).json({ msg: '手机号不存在，登录失败！' })
                } else {
                    bcrypt.compare(user.userPwd, results[0].userPwd, function(err, resPwd) {
                        // res == true
                        if (resPwd) {
                            //记录登录成功后的token
                            jwt.sign({ userTel: user.userTel }, 'privateKey', { expiresIn: 60 * 60 }, function(err, token) {
                                console.log(token);
                                //注意token的固定格式“Bearer ”前缀
                                res.status(200).json({ msg: '登录成功！！', token: 'Bearer ' + token })
                            });
                        } else {
                            res.status(200).json({ msg: '密码错误，登录失败！！' })
                        }
                    });
                }
            }
        })
    },
    uploadFile: function(req, res) {
        //定义一个对象results，用于返回wangeditor
        var results = {
            "errno": 0,
            "data": []
        }
        var form = new formidable.IncomingForm() //创建上传表单对象
        form.uploadDir = path.join(__dirname, "..", "/public/upload") //创建上传文件的路径
        form.keepExtensions = true //设置保留上传文件的扩展名
            //当每个文件上传时都会触发的事件方法，用于多文件上传
        form.on('file', function(err, file) {
            console.log(path.parse(file.path).base)
            results.data.push('http://localhost:3000/upload/' + path.parse(file.path).base)
        })
        form.parse(req, function(err, fields, files) {
            if (err) {
                res.json({
                    "errno": -1,
                    "data": []
                })
            }
            res.json(results)
        })
    },
    commitFile: function(req, res) {
        console.log(req.body)
    },
    //手机验证码注册
    getVCode: function(req, res) {
        var userTel = req.query.userTel
        userDAO.gerVCode(userTel, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '号码查询失败' })
            } else {
                if (results.length == 0 || results == null) {
                    var queryData = qs.stringify({
                        "mobile": "13913645416", // 接受短信的用户手机号码
                        "tpl_id": "184626", // 您申请的短信模板ID，根据实际情况修改
                        "tpl_value": "#code#=1235231", // 您设置的模板变量，根据实际情况修改
                        "key": "10192a98f6229c3ae54581b74e951457", // 应用APPKEY(应用详细页查询)
                    });
                    var queryUrl = 'http://v.juhe.cn/sms/send?' + queryData;
                    //web服务器向聚合服务器发送请求
                    request(queryUrl, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body) // 打印接口返回内容
                            var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
                            console.log(jsonObj.error_code)
                        } else {
                            console.log('请求异常');
                        }
                    })
                } else {
                    res.json({ code: 500, msg: '号码已存在' })
                }
            }
        })
    }
}
module.exports = userController