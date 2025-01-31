const mongoose = require('mongoose');

const OrgSchema = mongoose.Schema({
    name:{type:String},
    address:{type:String},
    description:{type:String},
    jobs:{type:[String]},
    city:{type:String},
    phone:{type:Number},
    orgId:{type:mongoose.Types.ObjectId},
});

module.exports = mongoose.model("Orgs", OrgSchema);