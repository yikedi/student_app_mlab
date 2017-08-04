var express = require('express');
var router = express.Router();
var Student = require('../models/student');

/* GET home page. */
router.get('/', function(req, res, next) {

    if (!req.user){
        res.redirect('../users/login');
    }
    else {
        var user_list=Student.find({});
        res.render('chat', {user: req.user, user_list:user_list});
    }
});

module.exports = router