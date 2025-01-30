const mongoose = require('mongoose');

const ngoSchema = mongoose.Schema({
    name:{type:String , required:true},
    description:{type:String },
    link:{type:String},
    phone:{type:Number},
    address:{type:String},
    jobs:{type:[String]}
});


module.exports= mongoose.model('Ngos',ngoSchema);