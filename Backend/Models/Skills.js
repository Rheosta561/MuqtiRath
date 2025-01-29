const mongoose = require('mongoose');

const skillsSchema = mongoose.Schema({
    name:{type:String , required:true},
    desc:{type:String },
    link:{type:String },
    price:{type:String , default:'free'},
    image:{type:String }
});

module.exports=mongoose.model('Skills', skillsSchema);