var express = require('express');
var router = express.Router();
var gyqController = require('../controllers/gyqController')
var passport = require('passport')
//活动社区显示顺风拼车
router.get('/ShowCarSharing', function (req, res, next) {
    gyqController.ShowCarSharing(req, res)
});
//显示顺风拼车详情
router.get('/ShowCarSharing/:carSharingId',function (req, res, next) {
    gyqController.ShowCarSharingById(req, res)
 });
 
 
module.exports = router;