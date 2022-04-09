var express = require('express');
const router = express.Router();
var ApiUserController = require('../controllers/api.user.controller');
router.post('/user/reg',ApiUserController.postReg);
router.post('/user/login',ApiUserController.postLogin);
module.exports = router;