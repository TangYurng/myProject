var express = require('express');
var router = express.Router();
var CarListDetails = require('../controllers/CarListDetails')

//点击汽车获取它的详细信息
router.put('/ShowCarDetails', function(req, res, next) {
    CarListDetails.ShowCarDetails(req, res)
});
// ShowTypeCars
router.post('/ShowTypeCars', function(req, res, next) {
    CarListDetails.ShowTypeCars(req,res)
});
//根据品牌显示汽车
router.post('/ShowBrandCars', function(req, res, next) {
    CarListDetails.ShowBrandCars(req, res)
});
//根据价格范围显示汽车
router.post('/RangePrice', function(req, res, next) {
    CarListDetails.ShowPlimitsCars(req, res)
});
//根据排量显示汽车
router.post('/CarOutput', function(req, res, next) {
    CarListDetails.ShowDisplacement(req, res)
});
//根据车型显示汽车
// router.post('/CarType', function(req, res, next) {
//     CarListDetails.ShowTypeCars(req, res)
// });
//根据价格进行汽车的升序排序                                                                  
router.post('/PriceSortUp', function(req, res, next) {
    CarListDetails.ShowPriceSortUp(req, res)
});
// 根据价格进行汽车的降序排序  
router.post('/PriceSortDown', function(req, res, next) {
    CarListDetails.ShowPriceSortDown(req, res)
});
//根据销量进行汽车的排序
router.post('/ShowSalesSort', function(req, res, next) {
    CarListDetails.ShowSalesSort(req, res)
})
//搜索关键字（品牌、车型）
router.post('/SearchkeyWord', function(req, res, next) {
    CarListDetails.SearchkeyWord(req, res)
})
module.exports = router