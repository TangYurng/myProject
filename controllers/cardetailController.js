var cardetailDAO = require('../models/cardetailDAO')
var bcrypt = require('bcrypt')
var formidable = require('formidable')
var path = require('path')
var jwt = require('jsonwebtoken')
var cardetailController = {
    ShowCarAllcomment: function(req, res) {
        var userEvaluate = { carId: req.params.carId }
        cardetailDAO.ShowCarAllcomment(userEvaluate, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '查询车辆评论失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '查询车辆评论成功！' })
                } else {
                    res.json({ code: 200, msg: '该车辆无评论信息！' })
                }
            }
        })
    },
    userDiscuss: function(req, res) {
        cardetailDAO.getIdByTel(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '失败！' })
            } else {
                var userDiscuss = { userId: results[0].userId, carId: req.body.carId, content: req.body.content,orderID:req.body.orderID }
                cardetailDAO.userDiscuss(userDiscuss, function(err, results) {
                    if (err) {
                        res.json({ code: 500, msg: '评论失败！' })
                    } else {
                        res.json({ code: 200, data: results, msg: '评论成功！' })
                    }
                })
            }
        })
    },
    SubmitOrder: function(req, res) {
        cardetailDAO.getIdByTel(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '失败！' })
            } else {
                var SubmitOrder = { userId: results[0].userId, carId: req.body.carId, orderPrice:req.body.orderPrice,pickDate: req.body.pickDate, returnDate: req.body.returnDate, pickLocation:req.body.pickLocation,returnLocation:req.body.returnLocation }
                cardetailDAO.SubmitOrder(SubmitOrder, function(err, results) {
                    if (err) {
                        console.log(err.message)
                        res.json({ code: 500, msg: '订单创建失败！' })
                    } else {
                        //查询库存
                        cardetailDAO.SearchStock(SubmitOrder, function(err, results) {
                            if (err) {
                                res.json({ code: 500, msg: '汽车库存数查询失败！' })
                            } else if (results[0].stock == 0) {
                                res.json({ code: 500, msg: '汽车库存不足！' })
                            } else {
                                //增加销售数量
                                cardetailDAO.UpdCarSale(SubmitOrder, function(err, results) {
                                    if (err) {
                                        console.log(err.message)
                                        res.json({ code: 500, msg: '汽车销量数更改失败！' })
                                    }
                                });
                                //减少库存
                                cardetailDAO.ReduceStock(SubmitOrder, function(err, results) {
                                    if (err) {
                                        console.log(err.message)
                                        res.json({ code: 500, msg: '汽车库存数更改失败！' })
                                    }
                                });
                                res.json({ code: 200, msg: '订单创建成功！' })
                            }
                        });

                    }
                })
            }
        })
    },
    ShowAppointmentDetail: function(req, res) {
        var userShowAppointmentDetail = { orderID: req.params.orderID }
        cardetailDAO.ShowAppointmentDetail(userShowAppointmentDetail, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '订单查询失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '订单查询成功！' })
                } else {
                    res.json({ code: 200, msg: '订单查询失败！' })
                }
            }
        })
    },
    addFavourite: function(req, res) {
        cardetailDAO.getIdByTel(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '失败！' })
            } else {
                var addFavourite = { userId: results[0].userId, carId: req.body.carId }
                cardetailDAO.addFavourite(addFavourite, function(err, results) {
                    if (err) {
                        console.log(err.message)
                        res.json({ code: 500, msg: '添加收藏失败！' })
                    } else {
                        cardetailDAO.AddCarCollect(addFavourite, function(err, results) {
                            if (err) {
                                res.json({ code: 500, msg: '汽车收藏数更改失败！' })
                            }
                        })
                        res.json({ code: 200, msg: '添加收藏成功！' })
                    }
                })
            }
        })
    },
    Favourite: function(req, res) {
        cardetailDAO.getIdByTel(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '失败！' })
            } else {
                //判断有无收藏
                var user = { userId:req.user.userTel, carId: req.body.carId }
                cardetailDAO.ShowFavourite(user, function(err, results1) {
                        if (err) {
                            res.json({ code: 500, msg: '用户收藏查询失败！' })
                        } else {
                            console.log('判断有没有收藏',results1)
                            if (results1 == null || results1.length == 0) {
                                // 没有数据，加入收藏
                                console.log('没有数据，加入收藏')
                                var addFavourite = { userId: results[0].userId, carId: req.body.carId }
                                cardetailDAO.addFavourite(addFavourite, function(err, results) {
                                    if (err) {
                                        console.log(err.message)
                                        res.json({ code: 500, msg: '添加收藏失败！' })
                                    } else {
                                        cardetailDAO.AddCarCollect(addFavourite, function(err, results) {
                                            if (err) {
                                                res.json({ code: 500, msg: '汽车收藏数更改失败！' })
                                            }
                                        })
                                        res.json({ code: 200, data:1,msg: '添加收藏成功！' })
                                    }
                                })
                            }else{
                                console.log('取消收藏')
                                var addFavourite = { userId: results[0].userId, carId: req.body.carId }
                                cardetailDAO.CanFavourite(addFavourite, function(err, results) {
                                    if (err) {
                                        console.log(err.message)
                                        res.json({ code: 500, msg: '取消收藏失败！' })
                                    } else {
                                        cardetailDAO.CanCarCollect(addFavourite, function(err, results) {
                                            if (err) {
                                                res.json({ code: 500, msg: '汽车收藏数更改失败！' })
                                            }
                                        })
                                        res.json({ code: 200,data:2, msg: '取消收藏成功！' })
                                    }
                                })
                            }
                           
                        }
                    })
            }
        })
    },
    CanFavourite: function(req, res) {
        cardetailDAO.getIdByTel(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '失败！' })
            } else {
                var addFavourite = { userId: results[0].userId, carId: req.body.carId }
                cardetailDAO.CanFavourite(addFavourite, function(err, results) {
                    if (err) {
                        console.log(err.message)
                        res.json({ code: 500, msg: '取消收藏失败！' })
                    } else {
                        cardetailDAO.CanCarCollect(addFavourite, function(err, results) {
                            if (err) {
                                res.json({ code: 500, msg: '汽车收藏数更改失败！' })
                            }
                        })
                        res.json({ code: 200, msg: '取消收藏成功！' })
                    }
                })
            }
        })
    },
    OverOrder: function(req, res) {
        cardetailDAO.getIdByTel(req.user, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '失败！' })
            } else {
                //更改订单状态
                var OverOrder = { userId: results[0].userId, carId: req.body.carId, orderId: req.body.orderId }
                cardetailDAO.OverOrder(OverOrder, function(err, results) {
                    if (err) {
                        res.json({ code: 500, msg: '订单更改失败！' })
                    } else {
                        //增加库存
                        cardetailDAO.AddStock(OverOrder, function(err, results) {
                            if (err) {
                                res.json({ code: 500, msg: '汽车库存数更改失败！' })
                            }
                        });
                        res.json({ code: 200, data: results, msg: '订单更改成功！' })
                    }
                })
            }
        })
    },
    populerPic: function(req,res){
    
        cardetailDAO.populerPic(function(err,results){
            if (err) {
                res.json({ code: 500, msg: '查询失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '查询成功！' })
                } else {
                    res.json({ code: 200, msg: '查询失败！' })
                }
            }
        })
    }
}
module.exports = cardetailController