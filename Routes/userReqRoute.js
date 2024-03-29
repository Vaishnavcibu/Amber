const express = require('express');
var router= express.Router();
var UserReqModel=require("../Models/userReqModel");

console.log("user function files has been called");

router.post("/user/req",async(req,res)=>{
    var{userLatitude, userLongitude}=req.body;
    if(userLatitude==null || userLatitude==undefined)
    {
        res.status(200).json(
            {
                status:false,
                msg:"userLatitude is  not defined"

            }
        )
        return;
    }
    if(userLongitude==null || userLongitude==undefined)
    {
        res.status(200).json(
            {
                status:false,
                msg:"userLongitude is  not defined"

            }
        )
        return;
    }

var data=new UserReqModel();
data.userLatitude=userLatitude;
data.userLongitude=userLongitude;
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