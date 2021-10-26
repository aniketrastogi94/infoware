const express=require('express');
const router=express.Router();
const User=require('../models/User');
const Order=require('../models/Order');
const Product=require('../models/Product');
const auth=require('../config/auth');


router.post('/register',async(req,res)=>{
    try{
        const {email,password,name}=req.body;
        const newUser=new User();
        newUser.email=email;
        newUser.password=sha256(password);
        newUser.name=name;
        await newUser.save();
        return res.status(200).json({
            status:'success',
            message:'User registered successfully',
            data:newUser
        })
    }catch(err){
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})

router.post('/addProduct',auth,async(req,res)=>{
    try {
        const {name,price,description}=req.body;
        const prod=new Product();
        prod.name=name;
        prod.price=price;
        prod.description=description;
        await prod.save();
        return res.status(200).json({
            status:'success',
            message:'product added successfully',
            data:null
        })
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})


router.get('/viewOrders',auth,async(req,res)=>{
    try {
        const iop=await Order.find();
        return res.status(200).json({
            status:'success',
            message:'Orders found successfully',
            data:iop
        })
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})



module.exports=router;


