const express = require('express');
var router= express.Router();
var driverlocModel=require("../Models/driverlocModel");

console.log("user function files has been called");


router.post("/driver/location",async(req,res)=>{
    
    var{driverLatitude, driverLongitude}=req.body;


    if(driverLatitude==null || driverLatitude==undefined)
    {
        res.status(200).json(
            {
                status:false,
                msg:"driverLatitude is  not defined"

            }
        )
        return;
    }
    if(driverLongitude==null || driverLongitude==undefined)
    {
        res.status(200).json(
            {
                status:false,
                msg:"driverLongitude is  not defined"

            }
        )
        return;
    }

var data=new driverlocModel();
data.driverLatitude=driverLatitude;
data.driverLongitude=driverLongitude;
await data.save()
console.log(data._id)

    res.status(200).json(
        {
            status:true,
            msg:"success",
            user:data
        }
    )
return;
})
module.exports = router;