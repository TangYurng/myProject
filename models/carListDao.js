var DAO = require('./DAO')
var carListDao = {
    ShowCarDetails: function(carId,callback) {
        DAO('select * from cars where carId =?', [carId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    ShowBrandCars: function(brand, callback) {
        DAO('select * from cars where brand  =?', [brand], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    ShowPlimitsCars: function( price,callback) {
        DAO('select * from cars where price>? && price<? ', [price.lowPrice,price.highPrice], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    ShowDisplacement: function( displacement,callback) {
        DAO('select * from cars where displacement > ? && displacement < ?  ', [displacement.displacement1,displacement.displacement2], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
     ShowTypeCars: function(carType,callback) {

        DAO('select * from cars where carType =?',[carType], function(err, results) {
            
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    ShowPriceSortUp: function(callback) {
        DAO('select * from cars order by price asc ',null, function(err, results) {
            
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    ShowPriceSortDown: function(callback) {
        DAO('select * from cars order by price desc ',null, function(err, results) {
            
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    ShowSalesSort: function(callback) {
        DAO('select * from cars order by carsale desc    ',null, function(err, results) {
            
            if (err) {
                console.log(err.message)
                callback(err, null)
            } else {
                console.log(results)
                callback(null, results)
            }
        })
    },
    SearchkeyWord: function(ScarType,Sbrand,callback) {
        DAO( "SELECT * FROM cars WHERE carType like '%" + ScarType + "%' or brand like '%" + Sbrand + "%'",function(err, results) {
            if (err) {
                console.log(err.message)
                callback(err)
            } else {
                callback(null, results)
            }
        })
    },


}
module.exports = carListDao