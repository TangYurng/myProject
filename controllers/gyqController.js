var gyqDAO = require('../models/gyqDAO')
var bcrypt = require('bcrypt')
var formidable = require('formidable')
var path = require('path')
var jwt = require('jsonwebtoken')

var gyqController = {
    ShowAllActvity: function(req, res) {
        gyqDAO.ShowAllActvity(function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '活动内容显示失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '活动内容显示成功！' })
            }
        })
    },
    ShowActvityById: function(req, res) {
        var activityId = req.params.activityId
        gyqDAO.ShowActvityById(activityId, function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '活动信息查询失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '活动查询成功！' })
                } else {
                    res.json({ code: 200, msg: '无此活动！' })
                }
            }
        })
    },
    ShowCarSharing: function(req, res) {
        gyqDAO.ShowCarSharing(function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '拼车信息显示失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '拼车信息显示成功！' })
            }
        })
    },
    ShowCarSharingById: function(req, res) {
        var carSharingId = req.params.carSharingId
        gyqDAO.ShowCarSharingById(carSharingId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '拼车信息查询失败！' })
                console.log(err)
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '拼车查询成功！' })
                } else {
                    res.json({ code: 200, msg: '无此拼车信息！' })
                }
            }
        })
    },
    showPerson: function(req, res) {
        gyqDAO.showPerson(function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '个人信息显示失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '个人信息显示成功！' })
            }
        })
    },
    ShowAllCars: function(req, res) {
        gyqDAO.ShowAllCars(function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '汽车列表显示失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '汽车列表显示成功！' })
            }
        })
    },
    ShowTopCollect: function(req, res) {
        gyqDAO.ShowTopCollect(function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '显示失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '显示成功！' })
            }
        })
    },
    ShowTopSales: function(req, res) {
        gyqDAO.ShowTopSales(function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '显示失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '显示成功！' })
            }
        })
    },
    CarSharingOrder: function(req, res) {
        var userId = req.body.userId
        gyqDAO.CarSharingOrder(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '订单提交失败！' })
                console.log(err)
            } else {
                res.json({ code: 200, data: results, msg: '订单提交成功！' })
            }
        })
    },
  
}
module.exports = gyqController