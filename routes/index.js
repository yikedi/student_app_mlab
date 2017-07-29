var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/hackhub');
//
// var promise = mongoose.connect('mongodb://yikedi:lxc95mlab@ds013966.mlab.com:13966/yikedi_database', {
//     useMongoClient: true,
// });
// O

//mongoose.connect('mongodb://yikedi:lxc95mlab@ds013966.mlab.com:13966/yikedi_database');

var uri = 'mongodb://yikedi:lxc95mlab@ds013966.mlab.com:13966/yikedi_database';

mongoose.Promise = global.Promise;

var promise = mongoose.connect('mongodb://yikedi:lxc95mlab@ds013966.mlab.com:13966/yikedi_database', {
    useMongoClient: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var studentSchema = {
    firstName: String,
    lastName: String,
    school: String,
    enrolled: Boolean,
    age: Number
};

var Student = mongoose.model('Students', studentSchema, 'students');

db.once('open', function() {
    console.log('connected');
});

// db.once('open',function () {
//    var seedData=[
//        {
//
//            "firstName": "Yan",
//            "lastName": "Hong",
//            "school": "SFU",
//            "enrolled": false,
//            "age": 26
//        },
//        {
//
//            "firstName": "Neo",
//            "lastName": "Wang",
//            "school": "UBC",
//            "enrolled": true,
//            "age": 25
//        }
//    ];
//
//    Student.insertMany(seedData);
//
// });
//

// db.once('open', function callback () {
//
//     // Create song schema
//     var songSchema = mongoose.Schema({
//         decade: String,
//         artist: String,
//         song: String,
//         weeksAtOne: Number
//     });
//
//     // Store song documents in a collection called "songs"
//     var Song = mongoose.model('songs', songSchema);
//
//     // Create seed data
//     var seventies = new Song({
//         decade: '1970s',
//         artist: 'Debby Boone',
//         song: 'You Light Up My Life',
//         weeksAtOne: 10
//     });
//
//     var eighties = new Song({
//         decade: '1980s',
//         artist: 'Olivia Newton-John',
//         song: 'Physical',
//         weeksAtOne: 10
//     });
//
//     var nineties = new Song({
//         decade: '1990s',
//         artist: 'Mariah Carey',
//         song: 'One Sweet Day',
//         weeksAtOne: 16
//     });
//
//     /*
//      * First we'll add a few songs. Nothing is required to create the
//      * songs collection; it is created automatically when we insert.
//      */
//     var list = [seventies, eighties, nineties]
//     Song.insertMany(list);
//
//     /*
//      * Then we need to give Boyz II Men credit for their contribution
//      * to the hit "One Sweet Day".
//      */
//     Song.update({ song: 'One Sweet Day'}, { $set: { artist: 'Mariah Carey ft. Boyz II Men'} },
//         function (err, numberAffected, raw) {
//
//             if (err) return handleError(err);
//
//             /*
//              * Finally we run a query which returns all the hits that spend 10 or
//              * more weeks at number 1.
//              */
//             Song.find({ weeksAtOne: { $gte: 10} }).sort({ decade: 1}).exec(function (err, docs){
//
//                 if(err) throw err;
//
//                 docs.forEach(function (doc) {
//                     console.log(
//                         'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
//                         ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
//                     );
//                 });
//
//                 // Since this is an example, we'll clean up after ourselves.
//                 mongoose.connection.db.collection('songs').drop(function (err) {
//                     if(err) throw err;
//
//                     // Only close the connection when your app is terminating
//                     mongoose.connection.db.close(function (err) {
//                         if(err) throw err;
//                     });
//                 });
//             });
//         }
//     )
// });

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

    var newStudent = new Student(req.body)
    newStudent.save(function (err, doc) {
        res.redirect('/')
    })
});


router.post('/:id/edit/', function (req, res, next) {
    Student.update({"_id": req.params.id}, req.body, function (err, doc) {
        res.redirect('/')
    })
});

router.get('/:id/delete',function (req,res,next) {
    Student.remove({"_id":req.params.id});
    res.redirect('/');
});

module.exports = router;