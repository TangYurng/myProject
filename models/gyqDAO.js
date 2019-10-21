var DAO = require('./DAO')
    //针对用户数据表操作的模块对象
var gyqDAO = {
    ShowAllActvity: function(callback) {
        DAO('select * from activity where activity is not null order by activityDate desc', null, function(err, results) {
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    ShowActvityById: function(activityId, callback) {
        DAO('SELECT * from activity WHERE activityId=? ', [activityId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    ShowCarSharing: function(callback) {
        DAO("select * from userorder where carSharing = '是'", null, function(err, results) {
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                
                callback(null, results)
            }
        })
    },
    ShowCarSharingById: function(orderId,callback) {
        DAO("select * from userorder where carSharing = '是' and orderID = ?", [orderId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
                
            } else {
                callback(null, results)
            }
        })
    },

   
    showPerson: function(callback) {
        DAO('select * from users', null, function(err, results) {
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    ShowAllCars: function(callback) {
        DAO('select * from cars', null, function(err, results) {
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    ShowTopCollect: function(callback) {
        DAO(' select  carName,brand,carPic1,price,carcollect from cars where  exists (select * from cars cars2 where cars.carcollect<cars2.carcollect having count(*)<=2) order by carcollect desc ', null, function(err, results) {
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    ShowTopSales: function(callback) {
        DAO('select  carName,brand,carPic1,price,carsale from cars where  exists (select * from cars cars2 where cars.carsale<cars2.carsale having count(*)<=2) order by carsale desc', null, function(err, results) {
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
}
module.exports = gyqDAO