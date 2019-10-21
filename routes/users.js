var express = require('express');
var router = express.Router();
var passport = require('passport')
var userController = require('../controllers/userController')
    /*注册*/
router.post('/register', function(req, res, next) {
    userController.register(req, res)
});
/*登录*/
router.post('/login', function(req, res, next) {
    userController.login(req, res)
});
//手机验证码注册
router.get('/getVCode', function(req, res, next) {
    userController.getVCode(req, res)
});
module.exports = router;