var express = require('express');
var passport = require('passport');
var Student = require('../models/student');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {

    Student.register(new Student({ username : req.body.username, photo: req.body.photo, online:false }), req.body.password, function(err, student) {

        if (err) {
            return res.render('register', { student : student });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/student');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {

    if (req.body.photo){
        Student.update({"username":req.body.username},{"photo":req.body.photo,"online":true},function () {
            console.log(req.body.photo);
            res.redirect('/chat');
        });
    }
    else {
        Student.update({"username":req.body.username},{"online":true},function () {
            res.redirect('/chat');
        })
    }

});

router.get('/logout', function(req, res) {
    var username=req.user._doc.username;
    Student.update({"username":username},{"online":false},function () {
        req.logout();
        res.redirect('../student');
    })

});

module.exports = router;