var express = require('express');
var router = express.Router();
var passport = require('passport')
var cardetailController = require('../controllers/cardetailController');
//显示某辆汽车的评价内容
router.post('/ShowCarAllcomment/:carId', function(req, res, next) {
    cardetailController.ShowCarAllcomment(req, res)
});
//用户填写评价
router.post('/userDiscuss', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    cardetailController.userDiscuss(req, res)
});
//提交订单
router.post('/SubmitOrder', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    cardetailController.SubmitOrder(req, res)
});
//预订后显示订单明细
router.post('/ShowAppointmentDetail/:orderID', function(req, res, next) {
    cardetailController.ShowAppointmentDetail(req, res)
});
//加入收藏夹
router.post('/addFavourite', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    cardetailController.addFavourite(req, res)
});
//加入收藏夹
router.post('/Favourite', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    cardetailController.Favourite(req, res)
});

//取消收藏
router.post('/CanFavourite', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    cardetailController.CanFavourite(req, res)
});
//显示收藏数前四的汽车图片
router.post('/populerPic',function(req,res,next){
    cardetailController.populerPic(req,res)
})
//完成订单（从正在进行到已完成）
router.post('/OverOrder', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    cardetailController.OverOrder(req, res)
});
// //修改订单显示费用明细
// router.post('/ShowFeeDetail', function(req, res, next) {
//     cardetailController.ShowFeeDetail(req, res)
// });

module.exports = router;