var mongoose = require('mongoose');
var userReqSchema=mongoose.Schema({
    userLatitude:{
        type:Number
    },
    userLongitude:{
        type:Number
    },
    status:{
            type:String,default:"Active"
    }, 
}, 
{ 
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});

var sample = module.exports = mongoose.model('userReqModel', userReqSchema);
module.exports.get = function (callback, limit) {
    sample.find(callback).limit(limit);
} 