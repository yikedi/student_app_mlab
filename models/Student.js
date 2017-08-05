var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var passportLocalMongoose=require('passport-local-mongoose');
var studentSchema =new Schema ({
    username:String,
    password:String,
    firstName: String,
    lastName: String,
    school: String,
    enrolled: Boolean,
    age: Number,
    photo:String,
    online:Boolean,
    position:{lat:Number,lng:Number}
});

studentSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Student', studentSchema, 'students');

