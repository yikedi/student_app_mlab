var express = require('express');
var router = express.Router();
var Student = require('../models/student');

/* GET home page. */
router.get('/', function(req, res, next) {

    if (!req.user){
        res.redirect('../users/login');
    }
    else {
        Student.find({},function (err,ulist) {
            for (i=0;i<ulist.length;i++){
                u=ulist[i];
                console.log(u.photo);
            }
            res.render('chat', {user: req.user, user_list:ulist});
        });


    }
});

module.exports = router