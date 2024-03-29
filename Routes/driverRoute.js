const express = require('express');
var router= express.Router();
var bcryptjs=require("bcryptjs");
var jwt=require("jsonwebtoken");
var TokenModel=require("../Models/tokenModel");
var DriverModel=require("../Models/driverModel");
var randomstring=require('randomstring');

console.log("user function files has been called");


router.post("/driver/register",async(req,res)=>{
    
    var{name,phoneNo,email,password}=req.body;
    if(name==null || name==undefined)
    {
        res.status(200).json(
            {
                status:false,
                msg:"name is  not defined"

            }
        )
        return;
    }
    if(phoneNo==null || phoneNo==undefined)
    {
        res.status(200).json(
            {
                status:false,
                msg:"name is  not defined"
            }
        )
        return;
    }
//phone no checking 
    var alreadyexists=await DriverModel.findOne({status:"Active",phoneNo:phoneNo})
    if(alreadyexists !=null)
    {
        res.status(200).json(
            {
                status:false,
                msg:"this phone no already exist"
            }
        )
        return;
    }
    
    if(email==null || email==undefined)
    {
        res.status(200).json(
            {
                status:false,
                msg:"Email is  not defined"
            }
        )
        return;
    }
    if(password==null || password==undefined)
    {
        res.status(200).json(
            {
                status:false,
                msg:"password is  not defined"
            }
        )
        return;
    }

    function customIdGenerator(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
        
    const uniqueId = customIdGenerator(10);
    
var encryptedpassword=await bcryptjs.hash(password,10)
var data=new DriverModel();
data.name=name;
data.phoneNo=phoneNo;
data.email=email;
data.password=encryptedpassword;
data.uniqueId=uniqueId;
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

router.post("/driver/login",async(req,res)=>{
    try{
        var { email, uniqueId, password } = req.body;
        if (email == null || email == undefined) {
            res.status(200).json({
                status: false,
                msg: "Invalid email",
            });
            return;
        }

        if (uniqueId == null || uniqueId == undefined) {
            res.status(200).json({
                status: false,
                msg: "Invalid unique Id",
            });
            return;
        }

        var alreadyexists = await DriverModel.findOne({ status: "Active", uniqueId: uniqueId });
        if (alreadyexists == null) {
            res.status(200).json({
                status: false,
                msg: "Please register",
            });
            return;
        }

        if (password == null || password == undefined) {
            res.status(200).json({
                status: false,
                msg: "Invalid password",
            });
            return;
        }

        var isok = await bcryptjs.compare(password, alreadyexists.password);
    
    if(isok==true)
    {
        var token=await jwt.sign({
            uniqueId:alreadyexists,
            id:alreadyexists._id,
            role:alreadyexists.role
        
         }, "vaishanv",{expiresIn:12000})
        
        var tok=new TokenModel()
        tok.token=token;
        tok.userid=alreadyexists._id
        await tok.save();
        res.status(200).json(
            {
                status:true,
                msg:" login success",
                token:token,
                id:alreadyexists._id
    
            }
        )
        return;
    }
    else{
    
        res.status(200).json(
            {
                status:false,
                msg:"  invalid password credentials"
            }
        )
        return;
    }
    }
    catch(e){
        console.log(e)
    }
    });
    module.exports=router;