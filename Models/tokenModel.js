var mongoose = require('mongoose');
var tokenSchema=mongoose.Schema({
    status:{
        type:String
         },
    token:{
        type:String
         },   
    uniqueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"DriverModel"
         },  
},{ 
    //timestamps: true
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});

var sample = module.exports = mongoose.model('TokenModel', tokenSchema);
module.exports.get = function (callback, limit) {
    sample.find(callback).limit(limit);
} 