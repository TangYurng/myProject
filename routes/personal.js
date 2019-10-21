var express = require('express');
var router = express.Router();
var passport = require('passport')
var personalController = require('../controllers/personalController')

//显示某个用户的信息
router.post('/ShowUser', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.ShowUser(req, res)
});
//显示某个用户的收藏
router.post('/ShowCollect', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.ShowCollect(req, res)
});
//显示某个用户的全部订单
router.post('/ShowOrder', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.ShowOrder(req, res)
});
//显示某个用户已完成评价的订单及内容
router.post('/ShowEvaluate', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.ShowEvaluate(req, res)
});
//显示某个用户未评价的订单
router.post('/ShowUnEvaluate', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.ShowUnEvaluate(req, res)
});
//显示某个用户订单状态（已完成和正在进行）
router.post('/ShowOrderState', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.ShowOrderState(req, res)
});
//显示某个用户顺丰订单状态（已完成和正在进行）
router.post('/ShowSharingOrderState', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.ShowSharingOrderState(req, res)
});
//修改某个用户的信息（用户名，简介）
router.put('/UpdInfo', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.UpdInfo(req, res)
});
//修改用户的简介
router.put('/UpdIntro', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.UpdIntro(req, res)
});
//查找订单
router.post('/SearchOrder', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.SearchOrder(req, res)
});
//上传头像
router.post('/UpdHeadPic', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.UpdHeadPic(req, res)
});
//修改密码
router.put('/UpdPwd', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.UpdPwd(req, res)
});
module.exports = router;