var mongoose = require('mongoose');
var driverlocSchema=mongoose.Schema({
    driverLatitude:{
        type:Number
    },
    driverLongitude:{
        type:Number
    },
    status:{
            type:String,default:"Active"
    }, 
}, 
{ 
    //timestamps: true
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});
var sample = module.exports = mongoose.model('driverlocModel', driverlocSchema);
module.exports.get = function (callback, limit) {
    sample.find(callback).limit(limit);
} 