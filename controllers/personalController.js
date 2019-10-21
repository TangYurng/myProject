var PersonalDAO = require('../models/PersonalDAO')
var bcrypt = require('bcrypt')
var formidable = require('formidable')
var path = require('path')
var jwt = require('jsonwebtoken')
var personalController = {
     //查询用户收藏
     ShowUser: function(req, res) {
        PersonalDAO.ShowUser(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户信息查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '用户信息查询成功！' })
            }
        })
    },
    //查询用户收藏
    ShowCollect: function(req, res) {
        PersonalDAO.ShowCollect(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户收藏查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '用户收藏查询成功！' })
            }
        })
    },
    //查询某个用户的全部订单
    ShowOrder: function(req, res) {
        PersonalDAO.ShowOrder(req.user, function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '用户订单查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '用户订单查询成功！' })
            }
        })
    },
    //查询某个用户订单(已完成和正在进行)
    ShowOrderState: function(req, res) {
        var orderState = req.body.orderState
        PersonalDAO.ShowOrderState({ userTel: req.user.userTel, orderState: orderState }, function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '用户订单查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '用户已完成订单查询成功！' })
            }
        })
    },
    //查询某个用户顺丰订单(已完成和正在进行)
    ShowSharingOrderState: function(req, res) {
        var orderState = req.body.orderState
        PersonalDAO.ShowSharingOrderState({ userTel: req.user.userTel}, function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '用户订单查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '用户已完成订单查询成功！' })
            }
        })
    },
    //查询用户评论
    ShowEvaluate: function(req, res) {
        PersonalDAO.ShowEvaluate(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户评论查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '用户评论查询成功！' })
            }
        })
    },
    //查询用户未评论订单
    ShowUnEvaluate: function(req, res) {
        PersonalDAO.ShowUnEvaluate(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户评论查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '用户评论查询成功！' })
            }
        })
    },
    //修改用户信息（用户名、简介）
    UpdInfo: function(req, res) {
        var userName = req.body.userName
        PersonalDAO.UpdInfo({ userTel: req.user.userTel, userName: userName}, function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '用户信息修改失败！' })
            } else {
                //检查该操作对数据表是否造成影响
                if (results.affectedRows == 0) {
                    res.json({ code: 500, msg: '用户信息修改影响行为0！' })
                } else {
                    res.json({ code: 200, data: results, msg: '用户信息修改成功！' })
                }
            }
        })
    },
    //修改用户简介）
    UpdIntro: function(req, res) {
        var userIntro = req.body.intro
        PersonalDAO.UpdIntro({ userTel: req.user.userTel, userIntro: userIntro }, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户信息修改失败！' })
            } else {
                //检查该操作对数据表是否造成影响
                if (results.affectedRows == 0) {
                    res.json({ code: 500, msg: '用户信息修改影响行为0！' })
                } else {
                    res.json({ code: 200, data: results, msg: '用户信息修改成功！' })
                }
            }
        })
    },
    //搜索订单
    SearchOrder: function(req, res) {
        var orderId = req.body.orderId
        PersonalDAO.SearchOrder({ userTel: req.user.userTel, orderId: orderId }, function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '用户订单搜索失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '用户订单搜索成功！' })
            }
        })
    },
    //上传头像
    UpdHeadPic: function(req, res) {
        var form = new formidable.IncomingForm() //创建上传表单对象
        form.uploadDir = path.join(__dirname, '..', '/public/upload') //设置上传文件的路径
        form.keepExtensions = true //设置保留上传文件的扩展名
        form.parse(req, function(err, fields, files) {
            if (err) {
                res.send('文件上传错误！')
            }
            //fields是上传的表单字段数组，files是上传的文件列表
            // console.log(files)
            //保存图片路径到数据库
            //1.获取当前用户编号
            //2.获取当前用户的图片名称
            var headPic = path.parse(files.headPic.path).base
            PersonalDAO.upload({ headPic: headPic, userTel: req.user.userTel }, function(err, results) {
                if (err) {
                    console.log(err)
                    res.json({ code: 500, msg: '上传文件失败！' })
                } else {
                    res.json({ code: 200, data: results, msg: '上传文件成功！' })
                }
            })
        })
    },
    //修改用户密码
    UpdPwd: function(req, res) {
        var user = { userTel: req.user.userTel, userPwd: req.body.userPwd, userNewPwd: req.body.userNewPwd }
        PersonalDAO.ShowPwd(user.userTel, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户密码修改失败！' })
            } else {
                bcrypt.compare(user.userPwd, results[0].userPwd, function(err, resPwd) {
                    if (resPwd) {
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(user.userNewPwd, salt, function(err, hash) {
                                user.userNewPwd = hash
                                PersonalDAO.UpdPwd(user, function(err, results) {
                                    if (err) {
                                        res.json({ code: 500, msg: '用户密码修改失败！' })
                                    } else {
                                        res.status(200).json({ msg: '用户密码修改成功！' })
                                    }
                                })
                            })
                        })
                    } else {
                        res.status(200).json({ msg: '输入的原密码错误' })
                    }
                })
            }
        })
    },
}
module.exports = personalController