var DAO = require('./DAO')
    //针对用户数据表操作的模块对象
var PersonalDAO = {
     //查询用户
     ShowUser: function(user, callback) {
        DAO('select * from `users` WHERE userId = (select userId from `users` WHERE userTel = ?)', [user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        }) 
    },
    //查询用户收藏
    ShowCollect: function(user, callback) {
        DAO('select * from `collect`,`cars` WHERE userId = (select userId from `users` WHERE userTel = ?) AND collect.carId = cars.carId', [user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //查询某个用户全部订单
    ShowOrder: function(user, callback) {
        DAO('select * from userorder,cars where userId = (select userId from `users` WHERE userTel = ?) and userorder.carId = cars.carId ORDER BY orderDate desc', [user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    //查询用户评论
    ShowEvaluate: function(user, callback) {
        DAO("SELECT * from cars,(select * from evaluate where userId = (select userId from `users` WHERE userTel = ?))as from1,(SELECT * from userorder)as from2 WHERE cars.carId=FROM1.carId and from1.orderID=from2.orderID", [user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //查询用户未评论订单
    ShowUnEvaluate: function(user, callback) {
        DAO("SELECT * from cars,(select * from userorder where orderID  not in (select orderId from evaluate) and userId = (select userId from `users` WHERE userTel =?) and orderState='已完成')as FROM1 WHERE cars.carId =from1.carId ORDER BY orderDate desc", [user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //查询某个用户订单(已完成和正在进行)
    ShowOrderState: function(user, callback) {
        DAO("SELECT * from cars,(select * from userorder where userId = (select userId from `users` WHERE userTel = ?) and orderState = ? )as from1 WHERE cars.carId=FROM1.carId ORDER BY orderDate desc", [user.userTel, user.orderState], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //查询某个用户顺丰订单(已完成和正在进行)
    ShowSharingOrderState: function(user, callback) {
        DAO("select * from userorder where userId = (select userId from `users` WHERE userTel = ?) and carSharing = '是'", [user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //修改用户信息（用户名，简介）
    UpdInfo: function(user, callback) {
        console.log(user)
        DAO('update users set userName =?  where userTel = ?', [user.userName, user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //修改用户简介
    UpdIntro: function(user, callback) {
        DAO('update users set intro =? where userTel = ?', [user.userIntro, user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //搜索订单
    SearchOrder: function(user, callback) {
        DAO('SELECT * from cars,(select * from userorder where userId = (select userId from `users` WHERE userTel = ?) and orderId = ?)as from2 WHERE cars.carId =FROM2.carId ', [user.userTel, user.orderId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    //上传头像
    upload: function(user, callback) {
        DAO('update users set headPic = ? where userTel = ?', [user.headPic, user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //查询用户密码
    ShowPwd: function(userTel, callback) {
        DAO('select * from users where userTel = ?', [userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //修改用户的密码
    UpdPwd: function(user, callback) {
        DAO('update users set userPwd =?  where userTel = ?', [user.userNewPwd, user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
}
module.exports = PersonalDAO