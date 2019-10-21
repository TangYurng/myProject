var mysql = require('mysql')
var dbconfig = require('../config/dbconfig')

//通用的数据库操作方法
function commonQuery(sql,params,callback) {
    var connection = mysql.createConnection(dbconfig)
    connection.connect()
    connection.query(sql, params, function (err, results, fileds) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        connection.end()
        console.log('数据库连接关闭！')
    })
}
module.exports = commonQuery