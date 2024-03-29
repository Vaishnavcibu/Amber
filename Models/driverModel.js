var mongoose = require('mongoose');
var DriverSchema=mongoose.Schema({
    name:{
        type:String
         },
    phoneNo:{
       type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    uniqueId:{
        type:String
    },
    status:{
        type:String,
        default:"Active"
    },
    role:{
        type:String,
        default:"driver"
    }
}, 
{ 
    //timestamps: true
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});


var sample = module.exports = mongoose.model('DriverModel', DriverSchema);
module.exports.get = function (callback, limit) {
    sample.find(callback).limit(limit);
} 