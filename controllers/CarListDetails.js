var carListDao = require('../models/carListDao')
var CarListDetails = {
    ShowCarDetails: function(req, res) {
        var carId = req.body.carId
        carListDao.ShowCarDetails(carId,function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '汽车详细信息查询失败' })

            } else {
                res.json({ code: 200, data: results, msg: '汽车详细信息查询成功' })
            }
        })
    },

    ShowBrandCars: function(req, res) {
        var brand = req.body.brand
        console.log(req.body)
        carListDao.ShowBrandCars(brand, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '汽车品牌信息查询失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '汽车品牌查询成功！' })
                } else {
                    console.log(results)
                    res.json({ code: 200, data: results,msg: '没有该品牌汽车！' })
                }
            }
        })
    },
    ShowPlimitsCars: function(req, res) {
        var price ={lowPrice:req.body.lowPrice,highPrice:req.body.highPrice}
        carListDao.ShowPlimitsCars(price, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '查询失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '查询成功！' })
                } else {
                    // console.log(results)
                    res.json({ code: 200, msg: '该范围内没有相应的车！' })
                }
            }
        })
    },
    ShowDisplacement: function(req, res) {
        var displacement = {displacement1:req.body.displacement1,displacement2:req.body.displacement2}
        carListDao.ShowDisplacement(displacement,function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '查询失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '查询成功！' })
                } else {
                    // console.log(results)
                    res.json({ code: 200, msg: '没有该排量的车！' })
                }
            }
        })
    },
    ShowTypeCars: function(req, res) {
        var carType = req.body.carType
            console.log(req.body)
        carListDao.ShowTypeCars(carType ,function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '查询失败！' })
            } else {
                    console.log(results)
                    res.json({ code: 200,data: results, msg: '查询成功！' })
                }
            
        })
    },
    ShowPriceSortUp:function(req,res){
        var carType = req.body.carType
        carListDao.ShowPriceSortUp(function(err,results){
            if(err){
                res.json({code:500,msg:'升序排序失败'})
            }else{
                res.json({code:200,data: results,msg:'升序成功'})
            }
        })
    },
    ShowPriceSortDown:function(req,res){
        carListDao.ShowPriceSortDown(function(err,results){
            if(err){
                res.json({code:500,msg:'升序排序失败'})
            }else{
                res.json({code:200,data: results,msg:'升序成功'})
            }
        })
    },
    ShowSalesSort:function(req,res){
        carListDao.ShowSalesSort(function(err,results){
            if(err){
                res.json({code:500,msg:'销量排序失败'})
            }else{
                res.json({code:200,data: results,msg:'汽车销量排序成功'})
            }
        })
    },
    SearchkeyWord:function(req,res){
        var ScarType = req.body.carType;
        var Sbrand = req.body.brand;
        carListDao.SearchkeyWord(ScarType,Sbrand,function(err,results){
            if(err){
                res.json({code:500,msg:'搜索有误'})
            }else{
                res.json({code:200,data: results,msg:'搜索成功'})
            }
        })
    },

}

module.exports = CarListDetails