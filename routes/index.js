var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// var url = 'mongodb://yikedi:lxc95mlab@ds013966.mlab.com:13966/yikedi_database';
//
// mongoose.Promise = global.Promise;
//
// var promise = mongoose.connect(url, {
//     useMongoClient: true,
// });
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
//
// db.once('open', function() {
//     console.log('connected');
// });
//
// var studentSchema = {
//     firstName: String,
//     lastName: String,
//     school: String,
//     enrolled: Boolean,
//     age: Number,
//     photo: String
// };
//
// var Student = mongoose.model('Students', studentSchema, 'students');

var Student = require('../models/student');


/* GET home page. */
router.get('/', function (req, res, next) {
    Student.find({}, function (err, doc) {
        res.render('index', {title: 'WebDxDDDDDD', name: 'Yan', students: doc});
    })
});

router.get('/new', function (req, res, next) {
    res.render('new', {})
});


router.get('/:id/edit', function (req, res, next) {
    Student.findById(req.params.id, function (err, doc) {
        res.render('edit', {student: doc})
    });

});


router.get('/:id', function (req, res, next) {
    Student.findById(req.params.id, function (err, doc) {
        res.render('detail', {student: doc})
    });
});

router.post('/new', function (req, res, next) {

    var newStudent = new Student(req.body);
    newStudent.online=false;
    newStudent.save(function (err, doc) {
        res.redirect('/student')
    })
});


router.post('/:id/edit/', function (req, res, next) {
    Student.update({"_id": req.params.id}, req.body, function (err, doc) {
        res.redirect('/student')
    })
});

router.get('/:id/delete',function (req,res,next) {
    Student.remove({"_id":req.params.id},function () {
        res.redirect('/student');
    });

});

module.exports = router;