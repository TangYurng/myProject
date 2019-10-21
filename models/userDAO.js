var DAO = require('./DAO')
    //针对用户数据表操作的模块对象
var userDAO = {
    register: function(user, callback) {
        console.log(user)
        DAO('insert into users(userTel,userPwd) values(?,?)', [user.userTel, user.userPwd], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getUserByTel: function(userTel, callback) {
        DAO('select * from users where userTel = ?', [userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    gerVCode: function(userTel, callback) {
        DAO('select * from users where userTel = ?', [userTel], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
}
module.exports = userDAO