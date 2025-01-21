const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type:String , required:true , unique:true},
    age:{type:Number , required:true},
    gender:{type:String},
    health:{type:[String]},
    education:{type:String},
    story:{type:String},
    password:{type:String}

});

module.exports= mongoose.model('User', userSchema);