var DAO = require('./DAO')
var cardetail = {
    getIdByTel: function(user, callback) {
        DAO('select userId from users where userTel = ?', [user.userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    ShowCarAllcomment: function(userEvaluate, callback) {
        DAO('select userName,evaluateDate,content from users,evaluate where users.userId = evaluate.userId and carId=?', [userEvaluate.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    userDiscuss: function(userDiscuss, callback) {
        DAO('insert into evaluate(userId,carId,content,orderId) values(?,?,?,?)', [userDiscuss.userId, userDiscuss.carId, userDiscuss.content,userDiscuss.orderID], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    SubmitOrder: function(SubmitOrder, callback) {
        DAO('insert into userorder(userId,carId,orderPrice,pickDate,returnDate,pickLocation,returnLocation) values(?,?,?,?,?,?,?)', [SubmitOrder.userId, SubmitOrder.carId, SubmitOrder.orderPrice,SubmitOrder.pickDate,SubmitOrder.returnDate, SubmitOrder.pickLocation,SubmitOrder.returnLocation], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    ShowAppointmentDetail: function(userShowAppointmentDetail, callback) {
        DAO('select carName,orderDate,orderState,orderPrice,pickDate,returnDate,pickLocation,returnLocation from userorder,cars where userorder.carId = cars.carId and orderID=?', [userShowAppointmentDetail.orderID], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    populerPic: function(callback){
        DAO('select carId,carPic1,carName,price from cars ORDER BY carcollect DESC LIMIT 4', function(err, results){
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    addFavourite: function(addFavourite, callback) {
        DAO('insert into collect(userId,carId) values(?,?)', [addFavourite.userId, addFavourite.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //查询用户收藏
    ShowFavourite: function(user, callback) {
        console.log('判断收藏输入参数',user.userId,user.carId)
        DAO('select * from `collect`,`cars` WHERE userId = (select userId from `users` WHERE userTel = ?) AND collect.carId = cars.carId AND cars.carId = ?', [user.userId,user.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    AddCarCollect: function(addFavourite, callback) {
        DAO('update cars set carcollect =carcollect+1 where carId = ?', [addFavourite.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    CanCarCollect: function(addFavourite, callback) {
        DAO('update cars set carcollect =carcollect-1 where carId = ?', [addFavourite.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    UpdCarSale: function(SubmitOrder, callback) {
        DAO('update cars set carsale =carsale+1 where carId = ?', [SubmitOrder.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    CanFavourite: function(addFavourite, callback) {
        DAO('delete from collect where userId = ? and carId = ?', [addFavourite.userId, addFavourite.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    SearchStock: function(SubmitOrder, callback) {
        DAO('select stock from cars where carId = ?', [SubmitOrder.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    ReduceStock: function(SubmitOrder, callback) {
        DAO('update cars set stock =stock-1 where carId = ?', [SubmitOrder.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //更改订单状态
    OverOrder: function(OverOrder, callback) {
        DAO("update userorder set orderState ='已完成' where orderId = ?", [OverOrder.orderId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //增加库存
    AddStock: function(OverOrder, callback) {
        DAO('update cars set stock =stock+1 where carId = ?', [OverOrder.carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
}
module.exports = cardetail