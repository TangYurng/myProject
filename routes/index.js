var express = require('express');
var router = express.Router();
var passport = require('passport')
var gyqController = require('../controllers/gyqController')
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.json('ok!')
});
/* 获取所有用户信息. */
router.post('/showPerson', function(req, res, next) {
    gyqController.showPerson(req, res)
});
//显示汽车列表
router.get('/ShowAllCars', function(req, res, next) {
    gyqController.ShowAllCars(req, res)
});
//活动社区显示全部活动内容
router.get('/ShowAllActvity', function(req, res, next) {
    gyqController.ShowAllActvity(req, res)
});
//显示活动的详情
router.get('/ShowAllActvity/:activityId', function(req, res, next) {
    gyqController.ShowActvityById(req, res)
});
//根据收藏数目显示热门推荐
router.get('/ShowTopCollect', function(req, res, next) {
    gyqController.ShowTopCollect(req, res)
});
//根据销量显示热门推荐
router.get('/ShowTopSales', function(req, res, next) {
    gyqController.ShowTopSales(req, res)
});

module.exports = router;